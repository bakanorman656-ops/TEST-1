'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, CreditCard, MoreHorizontal, Trash2, CheckCircle, Clock, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createPayment, deletePayment, updatePaymentStatus, createReminder } from '@/app/actions/business'

interface Payment {
  id: number
  clientId: number
  businessId: number
  amount: string
  description: string
  dueDate: string
  status: string | null
  paidAt: Date | null
  createdAt: Date | null
}

interface Client {
  id: number
  businessId: number
  name: string
}

interface Business {
  id: number
  name: string
}

interface PaymentListProps {
  payments: Payment[]
  clients: Client[]
  businesses: Business[]
}

export function PaymentList({ payments, clients, businesses }: PaymentListProps) {
  const router = useRouter()
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isReminderOpen, setIsReminderOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [selectedBusiness, setSelectedBusiness] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const filteredClients = selectedBusiness 
    ? clients.filter(c => c.businessId === parseInt(selectedBusiness))
    : clients

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const clientId = parseInt(formData.get('clientId') as string)
    const client = clients.find(c => c.id === clientId)
    
    await createPayment({
      clientId,
      businessId: client?.businessId ?? parseInt(selectedBusiness),
      amount: formData.get('amount') as string,
      description: formData.get('description') as string,
      dueDate: formData.get('dueDate') as string,
    })
    
    setLoading(false)
    setIsCreateOpen(false)
    setSelectedBusiness('')
    router.refresh()
  }

  const handleSetReminder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedPayment) return
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    await createReminder({
      paymentId: selectedPayment.id,
      reminderDate: formData.get('reminderDate') as string,
      reminderTime: formData.get('reminderTime') as string,
      message: formData.get('message') as string || undefined,
    })
    
    setLoading(false)
    setIsReminderOpen(false)
    setSelectedPayment(null)
    router.refresh()
  }

  const handleMarkPaid = async (id: number) => {
    await updatePaymentStatus(id, 'paid')
    router.refresh()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this payment?')) return
    await deletePayment(id)
    router.refresh()
  }

  const openReminder = (payment: Payment) => {
    setSelectedPayment(payment)
    setIsReminderOpen(true)
  }

  const getClientName = (clientId: number) => clients.find(c => c.id === clientId)?.name ?? 'Unknown'
  const getBusinessName = (businessId: number) => businesses.find(b => b.id === businessId)?.name ?? 'Unknown'

  const getStatusBadge = (status: string | null, dueDate: string) => {
    if (status === 'paid') {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500">Paid</span>
    }
    const due = new Date(dueDate)
    const today = new Date()
    const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">Overdue</span>
    } else if (diffDays <= 3) {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange/10 text-orange">Due Soon</span>
    }
    return <span className="px-2 py-1 rounded-full text-xs font-medium bg-cyan/10 text-cyan">Pending</span>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payments</h1>
          <p className="text-muted-foreground">Track and manage client payments</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-purple-pink text-white border-0" disabled={clients.length === 0}>
              <Plus className="h-4 w-4 mr-2" />
              Add Payment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Payment</DialogTitle>
              <DialogDescription>Record a payment that a client needs to make.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="business">Business *</Label>
                <Select value={selectedBusiness} onValueChange={setSelectedBusiness}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a business" />
                  </SelectTrigger>
                  <SelectContent>
                    {businesses.map((business) => (
                      <SelectItem key={business.id} value={business.id.toString()}>
                        {business.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientId">Client *</Label>
                <Select name="clientId" required disabled={!selectedBusiness}>
                  <SelectTrigger>
                    <SelectValue placeholder={selectedBusiness ? "Select a client" : "Select a business first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredClients.map((client) => (
                      <SelectItem key={client.id} value={client.id.toString()}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount *</Label>
                  <Input id="amount" name="amount" type="number" step="0.01" required placeholder="1000.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date *</Label>
                  <Input id="dueDate" name="dueDate" type="date" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Input id="description" name="description" required placeholder="Website redesign project" />
              </div>
              <Button type="submit" disabled={loading} className="w-full gradient-purple-pink text-white border-0">
                {loading ? 'Adding...' : 'Add Payment'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* No clients warning */}
      {clients.length === 0 && (
        <div className="bg-orange/10 border border-orange/20 rounded-xl p-4 text-center">
          <p className="text-orange font-medium">You need to add clients first before recording payments.</p>
          <Button variant="link" className="text-orange" onClick={() => router.push('/dashboard/clients')}>
            Go to Clients
          </Button>
        </div>
      )}

      {/* Payment List */}
      {payments.length === 0 ? (
        <div className="bg-card rounded-xl p-12 border border-border/50 text-center">
          <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-foreground mb-2">No payments yet</h3>
          <p className="text-muted-foreground mb-4">Record your first payment to start tracking.</p>
          {clients.length > 0 && (
            <Button onClick={() => setIsCreateOpen(true)} className="gradient-purple-pink text-white border-0">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Payment
            </Button>
          )}
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Client</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Due Date</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Status</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-foreground">{getClientName(payment.clientId)}</p>
                        <p className="text-xs text-muted-foreground">{getBusinessName(payment.businessId)}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-foreground">{payment.description}</td>
                    <td className="py-3 px-4 font-semibold text-foreground">${parseFloat(payment.amount).toLocaleString()}</td>
                    <td className="py-3 px-4 text-muted-foreground">{new Date(payment.dueDate).toLocaleDateString()}</td>
                    <td className="py-3 px-4">{getStatusBadge(payment.status, payment.dueDate)}</td>
                    <td className="py-3 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {payment.status !== 'paid' && (
                            <>
                              <DropdownMenuItem onClick={() => handleMarkPaid(payment.id)}>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Mark as Paid
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openReminder(payment)}>
                                <Bell className="h-4 w-4 mr-2" />
                                Set Reminder
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem 
                            onClick={() => handleDelete(payment.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Set Reminder Dialog */}
      <Dialog open={isReminderOpen} onOpenChange={setIsReminderOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Payment Reminder</DialogTitle>
            <DialogDescription>
              Schedule a reminder for this payment. You can set the exact date and time.
            </DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <form onSubmit={handleSetReminder} className="space-y-4">
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="font-medium text-foreground">{getClientName(selectedPayment.clientId)}</p>
                <p className="text-sm text-muted-foreground">{selectedPayment.description}</p>
                <p className="text-sm font-semibold text-foreground mt-1">${parseFloat(selectedPayment.amount).toLocaleString()}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reminderDate">Reminder Date *</Label>
                  <Input id="reminderDate" name="reminderDate" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reminderTime">Reminder Time *</Label>
                  <Input id="reminderTime" name="reminderTime" type="time" required defaultValue="09:00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Custom Message (optional)</Label>
                <Input id="message" name="message" placeholder="Reminder: Payment due soon..." />
              </div>
              <Button type="submit" disabled={loading} className="w-full gradient-purple-pink text-white border-0">
                {loading ? 'Setting...' : 'Set Reminder'}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
