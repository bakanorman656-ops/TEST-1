import { Users, CreditCard, Bell, BarChart3, Bot, Settings, User, Building2, TrendingUp } from 'lucide-react'
import Image from 'next/image'

const sidebarItems = [
  { icon: BarChart3, label: 'Dashboard', active: true },
  { icon: Building2, label: 'Businesses', active: false },
  { icon: Users, label: 'Clients', active: false },
  { icon: CreditCard, label: 'Payments', active: false },
  { icon: Bell, label: 'Reminders', active: false },
  { icon: TrendingUp, label: 'Reports', active: false },
  { icon: Settings, label: 'Settings', active: false },
  { icon: User, label: 'Profile', active: false },
]

const stats = [
  { label: 'Total Clients', value: '128', change: '+12%', icon: Users, color: 'purple' },
  { label: 'Payments Uploaded', value: '64', change: '+8%', icon: CreditCard, color: 'pink' },
  { label: 'Upcoming Reminders', value: '23', change: '+5%', icon: Bell, color: 'cyan' },
  { label: 'Total Paid', value: '$24,580', change: '+15%', icon: TrendingUp, color: 'orange' },
]

const upcomingPayments = [
  { client: 'Tech Solutions Ltd.', desc: 'Payment for Website Redesign', date: '25 May, 2024', status: 'Due Tomorrow', statusColor: 'bg-destructive/10 text-destructive' },
  { client: 'Bright Marketing Agency', desc: 'Monthly Service Payment', date: '28 May, 2024', status: 'In 3 Days', statusColor: 'bg-orange/10 text-orange' },
  { client: 'Creative Studio', desc: 'Logo Design Payment', date: '31 May, 2024', status: 'In 6 Days', statusColor: 'bg-cyan/10 text-cyan' },
  { client: 'Future Enterprises', desc: 'Software Development Payment', date: '03 Jun, 2024', status: 'In 9 Days', statusColor: 'bg-emerald-500/10 text-emerald-500' },
]

export function DashboardPreview() {
  return (
    <section id="dashboard" className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Powerful Dashboard at Your Fingertips
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A beautiful, intuitive dashboard to manage all your business operations in one place.
          </p>
        </div>

        {/* Dashboard Mockup */}
        <div className="bg-card rounded-2xl shadow-2xl border border-border/50 overflow-hidden max-w-6xl mx-auto">
          <div className="flex">
            {/* Sidebar */}
            <div className="hidden lg:flex flex-col w-64 bg-navy text-white p-4">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-purple-pink">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="font-bold">AI Supports</span>
                  <p className="text-xs text-white/60">Bots</p>
                </div>
              </div>

              <nav className="space-y-1 flex-1">
                {sidebarItems.map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                      item.active ? 'bg-purple text-white' : 'text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </div>
                ))}
              </nav>

              {/* Upgrade Card */}
              <div className="mt-4 p-4 rounded-xl bg-white/10 border border-white/20">
                <p className="font-semibold text-sm mb-1">Upgrade to Pro</p>
                <p className="text-xs text-white/60 mb-3">Unlock more features and get more value.</p>
                <button className="w-full py-2 px-3 rounded-lg bg-orange text-white text-sm font-medium">
                  Upgrade Now
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-muted/30">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Welcome back</h3>
                  <p className="text-sm text-muted-foreground">{"Here's what's happening with your business today."}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-medium text-sm text-foreground">John Doe</p>
                    <p className="text-xs text-muted-foreground">Business Owner</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-purple/20 flex items-center justify-center">
                    <User className="h-5 w-5 text-purple" />
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="glass rounded-xl p-4 border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-lg bg-${stat.color}/20`}>
                        <stat.icon className={`h-4 w-4 text-${stat.color}`} />
                      </div>
                      <span className="text-xs font-medium text-emerald-500">{stat.change}</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Payments Table */}
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-card rounded-xl p-4 border border-border/50">
                  <h4 className="font-semibold text-foreground mb-4">Upcoming Payment Reminders</h4>
                  <div className="space-y-3">
                    {upcomingPayments.map((payment) => (
                      <div key={payment.client} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium text-sm text-foreground">{payment.client}</p>
                          <p className="text-xs text-muted-foreground">{payment.desc}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{payment.date}</p>
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${payment.statusColor}`}>
                            {payment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Assistant Widget */}
                <div className="bg-card rounded-xl p-4 border border-border/50">
                  <h4 className="font-semibold text-foreground mb-4">AI Bot Assistant</h4>
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-24 h-24 mb-4">
                      <Image
                        src="/images/ai-robot.png"
                        alt="AI Assistant"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Hi John! You have 23 upcoming payment reminders. Let me know if you need anything!
                    </p>
                    <button className="w-full py-2.5 px-4 rounded-lg gradient-purple-pink text-white text-sm font-medium">
                      Ask Me Anything
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
