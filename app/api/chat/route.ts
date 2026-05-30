import { streamText, convertToModelMessages, UIMessage } from 'ai'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { getDashboardStats, getUpcomingPayments, getBusinesses, getClients } from '@/app/actions/business'

export async function POST(req: Request) {
  // Verify authentication
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { messages }: { messages: UIMessage[] } = await req.json()

  // Get user context
  const [stats, upcomingPayments, businesses, clients] = await Promise.all([
    getDashboardStats(),
    getUpcomingPayments(10),
    getBusinesses(),
    getClients(),
  ])

  // Build context for the AI
  const businessContext = businesses.length > 0
    ? `User has ${businesses.length} business(es): ${businesses.map(b => b.name).join(', ')}.`
    : 'User has not registered any businesses yet.'

  const clientContext = clients.length > 0
    ? `Total of ${clients.length} clients across all businesses.`
    : 'No clients added yet.'

  const paymentContext = upcomingPayments.length > 0
    ? `Upcoming payments:\n${upcomingPayments.map(p => 
        `- ${p.client.name}: $${p.payment.amount} for "${p.payment.description}" due ${p.payment.dueDate}`
      ).join('\n')}`
    : 'No upcoming payments.'

  const systemPrompt = `You are an AI assistant for AI Supports Bots, a business payment reminder platform. 
Your name is AI Bot Assistant.

Current user context:
- Name: ${session.user.name}
- ${businessContext}
- ${clientContext}
- Total clients: ${stats.totalClients}
- Payments uploaded: ${stats.totalPayments}
- Upcoming reminders: ${stats.upcomingReminders}
- Total paid: $${stats.totalPaid.toLocaleString()}

${paymentContext}

Help the user with:
- Understanding their payment schedules
- Tips for managing clients and payments
- Explaining how the platform works
- General business advice for payment collection

Important information:
- Free plan allows up to 50 clients per business
- To upgrade, users pay to Opay account: 7067569737
- For support, contact WhatsApp: 07067569737
- Users can set custom reminder dates and times for each payment

Be helpful, friendly, and concise. Use the user's data to provide personalized advice.`

  const result = streamText({
    model: 'openai/gpt-4o-mini',
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
