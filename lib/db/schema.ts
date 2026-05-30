import { pgTable, text, timestamp, boolean, serial, decimal, date, time, integer } from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- App tables ------------------------------------------------------------

export const businesses = pgTable('businesses', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  name: text('name').notNull(),
  industry: text('industry'),
  address: text('address'),
  phone: text('phone'),
  email: text('email'),
  logoUrl: text('logo_url'),
  plan: text('plan').default('free'),
  clientLimit: integer('client_limit').default(50),
  isUpgraded: boolean('is_upgraded').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const clients = pgTable('clients', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull(),
  userId: text('user_id').notNull(),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  company: text('company'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  clientId: integer('client_id').notNull(),
  businessId: integer('business_id').notNull(),
  userId: text('user_id').notNull(),
  amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
  description: text('description').notNull(),
  dueDate: date('due_date').notNull(),
  status: text('status').default('pending'),
  paidAt: timestamp('paid_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const reminders = pgTable('reminders', {
  id: serial('id').primaryKey(),
  paymentId: integer('payment_id').notNull(),
  userId: text('user_id').notNull(),
  reminderDate: date('reminder_date').notNull(),
  reminderTime: time('reminder_time').notNull(),
  reminderType: text('reminder_type').default('email'),
  message: text('message'),
  status: text('status').default('pending'),
  sentAt: timestamp('sent_at'),
  createdAt: timestamp('created_at').defaultNow(),
})

// --- Chatbot & Security tables ---------------------------------------------

export const chatbotUsage = pgTable('chatbot_usage', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  usageCount: integer('usage_count').default(0),
  isSubscribed: boolean('is_subscribed').default(false),
  subscriptionType: text('subscription_type').default('free'),
  subscriptionStart: timestamp('subscription_start'),
  subscriptionEnd: timestamp('subscription_end'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const securityLogs = pgTable('security_logs', {
  id: serial('id').primaryKey(),
  userId: text('user_id'),
  businessId: integer('business_id'),
  eventType: text('event_type').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  description: text('description'),
  isSuspicious: boolean('is_suspicious').default(false),
  actionTaken: text('action_taken'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const passwordAttempts = pgTable('password_attempts', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  attemptCount: integer('attempt_count').default(0),
  lockedUntil: timestamp('locked_until'),
  lastAttempt: timestamp('last_attempt').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const adminMonitoring = pgTable('admin_monitoring', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  businessId: integer('business_id'),
  chatMessage: text('chat_message'),
  aiResponse: text('ai_response'),
  ipAddress: text('ip_address'),
  sessionId: text('session_id'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const bannedBusinesses = pgTable('banned_businesses', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  businessId: integer('business_id'),
  reason: text('reason').notNull(),
  bannedAt: timestamp('banned_at').defaultNow(),
  ipAddress: text('ip_address'),
  evidence: text('evidence'),
})
