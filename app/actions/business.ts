'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { businesses, clients, payments, reminders } from '@/lib/db/schema'
import { and, eq, desc, count, sql, gte } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

// Helper to get the current user ID
async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

// Constants
const FREE_CLIENT_LIMIT = 50
const OPAY_ACCOUNT = '7067569737'
const WHATSAPP_SUPPORT = '07067569737'

// ==================== BUSINESSES ====================

export async function getBusinesses() {
  const userId = await getUserId()
  return db
    .select()
    .from(businesses)
    .where(eq(businesses.userId, userId))
    .orderBy(desc(businesses.createdAt))
}

export async function getBusiness(id: number) {
  const userId = await getUserId()
  const [business] = await db
    .select()
    .from(businesses)
    .where(and(eq(businesses.id, id), eq(businesses.userId, userId)))
  return business
}

export async function createBusiness(data: {
  name: string
  industry?: string
  address?: string
  phone?: string
  email?: string
}) {
  const userId = await getUserId()
  const [business] = await db
    .insert(businesses)
    .values({
      userId,
      name: data.name,
      industry: data.industry,
      address: data.address,
      phone: data.phone,
      email: data.email,
    })
    .returning()
  
  revalidatePath('/dashboard')
  return business
}

export async function updateBusiness(id: number, data: {
  name?: string
  industry?: string
  address?: string
  phone?: string
  email?: string
}) {
  const userId = await getUserId()
  const [business] = await db
    .update(businesses)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(businesses.id, id), eq(businesses.userId, userId)))
    .returning()
  
  revalidatePath('/dashboard')
  return business
}

export async function deleteBusiness(id: number) {
  const userId = await getUserId()
  await db.delete(businesses).where(and(eq(businesses.id, id), eq(businesses.userId, userId)))
  revalidatePath('/dashboard')
}

// ==================== CLIENTS ====================

export async function getClients(businessId?: number) {
  const userId = await getUserId()
  const conditions = [eq(clients.userId, userId)]
  if (businessId) conditions.push(eq(clients.businessId, businessId))
  
  return db
    .select()
    .from(clients)
    .where(and(...conditions))
    .orderBy(desc(clients.createdAt))
}

export async function getClientCount(businessId: number) {
  const userId = await getUserId()
  const [result] = await db
    .select({ count: count() })
    .from(clients)
    .where(and(eq(clients.businessId, businessId), eq(clients.userId, userId)))
  return result?.count ?? 0
}

export async function canAddClient(businessId: number): Promise<{ allowed: boolean; count: number; limit: number }> {
  const userId = await getUserId()
  
  // Get business to check if upgraded
  const [business] = await db
    .select()
    .from(businesses)
    .where(and(eq(businesses.id, businessId), eq(businesses.userId, userId)))
  
  if (!business) throw new Error('Business not found')
  
  const clientCount = await getClientCount(businessId)
  const limit = business.clientLimit ?? FREE_CLIENT_LIMIT
  
  return {
    allowed: business.isUpgraded || clientCount < limit,
    count: clientCount,
    limit,
  }
}

export async function createClient(data: {
  businessId: number
  name: string
  email?: string
  phone?: string
  company?: string
  notes?: string
}) {
  const userId = await getUserId()
  
  // Check client limit
  const { allowed, count, limit } = await canAddClient(data.businessId)
  if (!allowed) {
    return {
      error: true,
      message: `You have reached the limit of ${limit} clients. Please upgrade to Pro to add more clients.`,
      upgradeRequired: true,
      opayAccount: OPAY_ACCOUNT,
      whatsappSupport: WHATSAPP_SUPPORT,
      currentCount: count,
      limit,
    }
  }
  
  const [client] = await db
    .insert(clients)
    .values({
      userId,
      businessId: data.businessId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      notes: data.notes,
    })
    .returning()
  
  revalidatePath('/dashboard')
  return { error: false, client }
}

export async function updateClient(id: number, data: {
  name?: string
  email?: string
  phone?: string
  company?: string
  notes?: string
}) {
  const userId = await getUserId()
  const [client] = await db
    .update(clients)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(clients.id, id), eq(clients.userId, userId)))
    .returning()
  
  revalidatePath('/dashboard')
  return client
}

export async function deleteClient(id: number) {
  const userId = await getUserId()
  await db.delete(clients).where(and(eq(clients.id, id), eq(clients.userId, userId)))
  revalidatePath('/dashboard')
}

// ==================== PAYMENTS ====================

export async function getPayments(businessId?: number, status?: string) {
  const userId = await getUserId()
  const conditions = [eq(payments.userId, userId)]
  if (businessId) conditions.push(eq(payments.businessId, businessId))
  if (status) conditions.push(eq(payments.status, status))
  
  return db
    .select()
    .from(payments)
    .where(and(...conditions))
    .orderBy(desc(payments.dueDate))
}

export async function getUpcomingPayments(limit = 10) {
  const userId = await getUserId()
  const today = new Date().toISOString().split('T')[0]
  
  return db
    .select({
      payment: payments,
      client: clients,
      business: businesses,
    })
    .from(payments)
    .innerJoin(clients, eq(payments.clientId, clients.id))
    .innerJoin(businesses, eq(payments.businessId, businesses.id))
    .where(
      and(
        eq(payments.userId, userId),
        eq(payments.status, 'pending'),
        gte(payments.dueDate, today)
      )
    )
    .orderBy(payments.dueDate)
    .limit(limit)
}

export async function createPayment(data: {
  clientId: number
  businessId: number
  amount: string
  description: string
  dueDate: string
}) {
  const userId = await getUserId()
  const [payment] = await db
    .insert(payments)
    .values({
      userId,
      clientId: data.clientId,
      businessId: data.businessId,
      amount: data.amount,
      description: data.description,
      dueDate: data.dueDate,
    })
    .returning()
  
  revalidatePath('/dashboard')
  return payment
}

export async function updatePaymentStatus(id: number, status: string) {
  const userId = await getUserId()
  const updates: Record<string, unknown> = { status, updatedAt: new Date() }
  if (status === 'paid') updates.paidAt = new Date()
  
  const [payment] = await db
    .update(payments)
    .set(updates)
    .where(and(eq(payments.id, id), eq(payments.userId, userId)))
    .returning()
  
  revalidatePath('/dashboard')
  return payment
}

export async function deletePayment(id: number) {
  const userId = await getUserId()
  await db.delete(payments).where(and(eq(payments.id, id), eq(payments.userId, userId)))
  revalidatePath('/dashboard')
}

// ==================== REMINDERS ====================

export async function getReminders(paymentId?: number) {
  const userId = await getUserId()
  const conditions = [eq(reminders.userId, userId)]
  if (paymentId) conditions.push(eq(reminders.paymentId, paymentId))
  
  return db
    .select()
    .from(reminders)
    .where(and(...conditions))
    .orderBy(reminders.reminderDate, reminders.reminderTime)
}

export async function createReminder(data: {
  paymentId: number
  reminderDate: string
  reminderTime: string
  reminderType?: string
  message?: string
}) {
  const userId = await getUserId()
  const [reminder] = await db
    .insert(reminders)
    .values({
      userId,
      paymentId: data.paymentId,
      reminderDate: data.reminderDate,
      reminderTime: data.reminderTime,
      reminderType: data.reminderType ?? 'email',
      message: data.message,
    })
    .returning()
  
  revalidatePath('/dashboard')
  return reminder
}

export async function deleteReminder(id: number) {
  const userId = await getUserId()
  await db.delete(reminders).where(and(eq(reminders.id, id), eq(reminders.userId, userId)))
  revalidatePath('/dashboard')
}

// ==================== DASHBOARD STATS ====================

export async function getDashboardStats() {
  const userId = await getUserId()
  
  const [clientCount] = await db
    .select({ count: count() })
    .from(clients)
    .where(eq(clients.userId, userId))
  
  const [paymentCount] = await db
    .select({ count: count() })
    .from(payments)
    .where(eq(payments.userId, userId))
  
  const today = new Date().toISOString().split('T')[0]
  const [upcomingCount] = await db
    .select({ count: count() })
    .from(payments)
    .where(
      and(
        eq(payments.userId, userId),
        eq(payments.status, 'pending'),
        gte(payments.dueDate, today)
      )
    )
  
  const [totalPaid] = await db
    .select({ total: sql<string>`COALESCE(SUM(${payments.amount}), 0)` })
    .from(payments)
    .where(and(eq(payments.userId, userId), eq(payments.status, 'paid')))
  
  return {
    totalClients: clientCount?.count ?? 0,
    totalPayments: paymentCount?.count ?? 0,
    upcomingReminders: upcomingCount?.count ?? 0,
    totalPaid: parseFloat(totalPaid?.total ?? '0'),
  }
}

// ==================== UPGRADE ====================

export async function getUpgradeInfo() {
  return {
    opayAccount: OPAY_ACCOUNT,
    whatsappSupport: WHATSAPP_SUPPORT,
    freeLimit: FREE_CLIENT_LIMIT,
  }
}

export async function requestUpgrade(businessId: number) {
  // This would typically create an upgrade request record
  // For now, return the payment info
  return {
    message: `To upgrade your business to Pro, please make payment to:\n\nOpay Account: ${OPAY_ACCOUNT}\n\nAfter payment, contact us on WhatsApp: ${WHATSAPP_SUPPORT} with your payment receipt.`,
    opayAccount: OPAY_ACCOUNT,
    whatsappSupport: WHATSAPP_SUPPORT,
  }
}
