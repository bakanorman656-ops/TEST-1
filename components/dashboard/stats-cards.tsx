import { Users, CreditCard, Bell, TrendingUp } from 'lucide-react'

interface StatsCardsProps {
  stats: {
    totalClients: number
    totalPayments: number
    upcomingReminders: number
    totalPaid: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      label: 'Total Clients',
      value: stats.totalClients.toString(),
      icon: Users,
      color: 'purple',
      bgColor: 'bg-purple/10',
      textColor: 'text-purple',
    },
    {
      label: 'Payments Uploaded',
      value: stats.totalPayments.toString(),
      icon: CreditCard,
      color: 'pink',
      bgColor: 'bg-pink/10',
      textColor: 'text-pink',
    },
    {
      label: 'Upcoming Reminders',
      value: stats.upcomingReminders.toString(),
      icon: Bell,
      color: 'cyan',
      bgColor: 'bg-cyan/10',
      textColor: 'text-cyan',
    },
    {
      label: 'Total Paid',
      value: `$${stats.totalPaid.toLocaleString()}`,
      icon: TrendingUp,
      color: 'orange',
      bgColor: 'bg-orange/10',
      textColor: 'text-orange',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="glass rounded-xl p-4 border border-border/50">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${card.bgColor}`}>
              <card.icon className={`h-5 w-5 ${card.textColor}`} />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{card.value}</p>
          <p className="text-sm text-muted-foreground">{card.label}</p>
        </div>
      ))}
    </div>
  )
}
