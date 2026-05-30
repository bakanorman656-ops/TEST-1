'use client'

import { formatDistanceToNow } from 'date-fns'

interface PaymentWithDetails {
  payment: {
    id: number
    amount: string
    description: string
    dueDate: string
    status: string | null
  }
  client: {
    name: string
    company: string | null
  }
  business: {
    name: string
  }
}

interface PaymentTableProps {
  payments: PaymentWithDetails[]
}

function getStatusStyle(dueDate: string) {
  const due = new Date(dueDate)
  const today = new Date()
  const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  
  if (diffDays <= 1) {
    return { label: 'Due Tomorrow', className: 'bg-destructive/10 text-destructive' }
  } else if (diffDays <= 3) {
    return { label: `In ${diffDays} Days`, className: 'bg-orange/10 text-orange' }
  } else if (diffDays <= 7) {
    return { label: `In ${diffDays} Days`, className: 'bg-cyan/10 text-cyan' }
  } else {
    return { label: `In ${diffDays} Days`, className: 'bg-emerald-500/10 text-emerald-500' }
  }
}

export function PaymentTable({ payments }: PaymentTableProps) {
  if (payments.length === 0) {
    return (
      <div className="bg-card rounded-xl p-6 border border-border/50">
        <h4 className="font-semibold text-foreground mb-4">Upcoming Payment Reminders</h4>
        <div className="text-center py-8 text-muted-foreground">
          <p>No upcoming payment reminders.</p>
          <p className="text-sm mt-1">Add payments to see them here.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-xl p-4 border border-border/50">
      <h4 className="font-semibold text-foreground mb-4">Upcoming Payment Reminders</h4>
      <div className="space-y-3">
        {payments.map(({ payment, client, business }) => {
          const status = getStatusStyle(payment.dueDate)
          return (
            <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm text-foreground truncate">{client.name}</p>
                <p className="text-xs text-muted-foreground truncate">{payment.description}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{business.name}</p>
              </div>
              <div className="text-right ml-4 flex-shrink-0">
                <p className="font-semibold text-sm text-foreground">${parseFloat(payment.amount).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{new Date(payment.dueDate).toLocaleDateString()}</p>
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${status.className}`}>
                  {status.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
