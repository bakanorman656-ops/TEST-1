'use client'

import { useRouter } from 'next/navigation'
import { Bell, Trash2, Clock, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deleteReminder } from '@/app/actions/business'

interface Reminder {
  id: number
  paymentId: number
  reminderDate: string
  reminderTime: string
  reminderType: string | null
  message: string | null
  status: string | null
  sentAt: Date | null
  createdAt: Date | null
}

interface Payment {
  id: number
  clientId: number
  amount: string
  description: string
  dueDate: string
}

interface Client {
  id: number
  name: string
}

interface ReminderListProps {
  reminders: Reminder[]
  payments: Payment[]
  clients: Client[]
}

export function ReminderList({ reminders, payments, clients }: ReminderListProps) {
  const router = useRouter()

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this reminder?')) return
    await deleteReminder(id)
    router.refresh()
  }

  const getPaymentDetails = (paymentId: number) => {
    const payment = payments.find(p => p.id === paymentId)
    if (!payment) return null
    const client = clients.find(c => c.id === payment.clientId)
    return { payment, client }
  }

  const getStatusBadge = (status: string | null, reminderDate: string) => {
    if (status === 'sent') {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500">Sent</span>
    }
    const reminder = new Date(reminderDate)
    const today = new Date()
    const diffDays = Math.ceil((reminder.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">Overdue</span>
    } else if (diffDays === 0) {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange/10 text-orange">Today</span>
    } else if (diffDays <= 3) {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-cyan/10 text-cyan">Soon</span>
    }
    return <span className="px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">Scheduled</span>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reminders</h1>
        <p className="text-muted-foreground">View and manage your payment reminders</p>
      </div>

      {/* Reminder List */}
      {reminders.length === 0 ? (
        <div className="bg-card rounded-xl p-12 border border-border/50 text-center">
          <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-foreground mb-2">No reminders scheduled</h3>
          <p className="text-muted-foreground mb-4">Set reminders from the Payments page to get notified.</p>
          <Button onClick={() => router.push('/dashboard/payments')} variant="outline">
            Go to Payments
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reminders.map((reminder) => {
            const details = getPaymentDetails(reminder.paymentId)
            if (!details) return null
            
            return (
              <div key={reminder.id} className="bg-card rounded-xl p-6 border border-border/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-purple/10">
                    <Bell className="h-6 w-6 text-purple" />
                  </div>
                  {getStatusBadge(reminder.status, reminder.reminderDate)}
                </div>
                
                <h3 className="font-semibold text-foreground mb-1">{details.client?.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{details.payment.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(reminder.reminderDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{reminder.reminderTime}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                  <span className="font-semibold text-foreground">${parseFloat(details.payment.amount).toLocaleString()}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDelete(reminder.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
