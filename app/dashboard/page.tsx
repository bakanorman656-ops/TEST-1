import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { getDashboardStats, getUpcomingPayments } from '@/app/actions/business'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { PaymentTable } from '@/components/dashboard/payment-table'
import { AIAssistant } from '@/components/dashboard/ai-assistant'
import { User } from 'lucide-react'

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  const stats = await getDashboardStats()
  const upcomingPayments = await getUpcomingPayments(5)

  const userName = session?.user?.name?.split(' ')[0] ?? 'there'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, {userName}</h1>
          <p className="text-muted-foreground">{"Here's what's happening with your business today."}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="font-medium text-sm text-foreground">{session?.user?.name}</p>
            <p className="text-xs text-muted-foreground">Business Owner</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-purple/20 flex items-center justify-center">
            <User className="h-5 w-5 text-purple" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PaymentTable payments={upcomingPayments} />
        </div>
        <div>
          <AIAssistant 
            userName={userName} 
            upcomingReminders={stats.upcomingReminders} 
          />
        </div>
      </div>
    </div>
  )
}
