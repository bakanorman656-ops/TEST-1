'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { adminMonitoring, securityLogs, bannedBusinesses, chatbotUsage, businesses, user } from '@/lib/db/schema'
import { eq, desc, and, sql } from 'drizzle-orm'
import { headers } from 'next/headers'

// Admin email - CHANGE THIS TO YOUR EMAIL
const ADMIN_EMAIL = 'normanbaka602@gmail.com'

async function verifyAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  if (session.user.email !== ADMIN_EMAIL) throw new Error('Access Denied')
  return session.user.id
}

export async function getAdminStats() {
  await verifyAdmin()
  
  const [totalUsers] = await db.select({ count: sql<number>`count(*)` }).from(user)
  const [totalBusinesses] = await db.select({ count: sql<number>`count(*)` }).from(businesses)
  const [totalBanned] = await db.select({ count: sql<number>`count(*)` }).from(bannedBusinesses)
  const [totalChatMessages] = await db.select({ count: sql<number>`count(*)` }).from(adminMonitoring)
  
  return {
    totalUsers: totalUsers?.count || 0,
    totalBusinesses: totalBusinesses?.count || 0,
    totalBanned: totalBanned?.count || 0,
    totalChatMessages: totalChatMessages?.count || 0,
  }
}

export async function getChatLogs(limit = 50) {
  await verifyAdmin()
  
  return db
    .select()
    .from(adminMonitoring)
    .orderBy(desc(adminMonitoring.createdAt))
    .limit(limit)
}

export async function getSecurityLogs(limit = 50) {
  await verifyAdmin()
  
  return db
    .select()
    .from(securityLogs)
    .orderBy(desc(securityLogs.createdAt))
    .limit(limit)
}

export async function getBannedBusinesses() {
  await verifyAdmin()
  
  return db
    .select()
    .from(bannedBusinesses)
    .orderBy(desc(bannedBusinesses.bannedAt))
}

export async function getChatbotSubscriptions() {
  await verifyAdmin()
  
  return db
    .select()
    .from(chatbotUsage)
    .orderBy(desc(chatbotUsage.updatedAt))
}

export async function manuallyBanBusiness(businessId: number, reason: string) {
  await verifyAdmin()
  
  // Get business info
  const [business] = await db
    .select()
    .from(businesses)
    .where(eq(businesses.id, businessId))
  
  if (!business) throw new Error('Business not found')
  
  // Add to banned list
  await db.insert(bannedBusinesses).values({
    userId: business.userId,
    businessId: business.id,
    reason,
    evidence: 'Manual ban by admin',
  })
  
  // Log security event
  await db.insert(securityLogs).values({
    userId: business.userId,
    businessId: business.id,
    eventType: 'manual_ban',
    description: `Admin manually banned business: ${reason}`,
    isSuspicious: true,
    actionTaken: 'banned',
  })
  
  return { success: true }
}

export async function unbanBusiness(banId: number) {
  await verifyAdmin()
  
  await db.delete(bannedBusinesses).where(eq(bannedBusinesses.id, banId))
  
  return { success: true }
}

export async function upgradeUserChatbot(userId: string, plan: 'monthly' | 'yearly') {
  await verifyAdmin()
  
  const subscriptionEnd = new Date()
  if (plan === 'monthly') {
    subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 1)
  } else {
    subscriptionEnd.setFullYear(subscriptionEnd.getFullYear() + 1)
  }
  
  // Check if user already has a chatbot usage record
  const [existing] = await db
    .select()
    .from(chatbotUsage)
    .where(eq(chatbotUsage.userId, userId))
  
  if (existing) {
    await db
      .update(chatbotUsage)
      .set({
        isSubscribed: true,
        subscriptionType: plan,
        subscriptionStart: new Date(),
        subscriptionEnd,
        updatedAt: new Date(),
      })
      .where(eq(chatbotUsage.userId, userId))
  } else {
    await db.insert(chatbotUsage).values({
      userId,
      isSubscribed: true,
      subscriptionType: plan,
      subscriptionStart: new Date(),
      subscriptionEnd,
    })
  }
  
  return { success: true }
}
