import { TrendingUp, Users, CreditCard, Bell } from 'lucide-react'
import { getDashboardStats, getBusinesses, getClients, getPayments } from '@/app/actions/business'

export default async function ReportsPage() {
  const [stats, businesses, clients, payments] = await Promise.all([
    getDashboardStats(),
    getBusinesses(),
    getClients(),
    getPayments(),
  ])

  const pendingPayments = payments.filter(p => p.status === 'pending')
  const paidPayments = payments.filter(p => p.status === 'paid')
  const totalPending = pendingPayments.reduce((sum, p) => sum + parseFloat(p.amount), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground">Overview of your business performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl p-6 border border-border/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-purple/10">
              <TrendingUp className="h-5 w-5 text-purple" />
            </div>
            <span className="text-sm text-muted-foreground">Total Businesses</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{businesses.length}</p>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-cyan/10">
              <Users className="h-5 w-5 text-cyan" />
            </div>
            <span className="text-sm text-muted-foreground">Total Clients</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{stats.totalClients}</p>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <CreditCard className="h-5 w-5 text-emerald-500" />
            </div>
            <span className="text-sm text-muted-foreground">Total Collected</span>
          </div>
          <p className="text-3xl font-bold text-foreground">${stats.totalPaid.toLocaleString()}</p>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-orange/10">
              <Bell className="h-5 w-5 text-orange" />
            </div>
            <span className="text-sm text-muted-foreground">Pending Amount</span>
          </div>
          <p className="text-3xl font-bold text-foreground">${totalPending.toLocaleString()}</p>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Payment Status */}
        <div className="bg-card rounded-xl p-6 border border-border/50">
          <h3 className="font-semibold text-foreground mb-4">Payment Status Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-muted-foreground">Paid</span>
              </div>
              <span className="font-semibold text-foreground">{paidPayments.length} payments</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-orange" />
                <span className="text-muted-foreground">Pending</span>
              </div>
              <span className="font-semibold text-foreground">{pendingPayments.length} payments</span>
            </div>
            <div className="pt-4 border-t border-border/50">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">Total Payments</span>
                <span className="font-bold text-foreground">{payments.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Business Summary */}
        <div className="bg-card rounded-xl p-6 border border-border/50">
          <h3 className="font-semibold text-foreground mb-4">Business Summary</h3>
          {businesses.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No businesses registered yet</p>
          ) : (
            <div className="space-y-3">
              {businesses.slice(0, 5).map((business) => {
                const businessClients = clients.filter(c => c.businessId === business.id)
                const businessPayments = payments.filter(p => p.businessId === business.id)
                return (
                  <div key={business.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium text-foreground">{business.name}</p>
                      <p className="text-xs text-muted-foreground">{businessClients.length} clients</p>
                    </div>
                    <span className="font-semibold text-foreground">
                      {businessPayments.length} payments
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
