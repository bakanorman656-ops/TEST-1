import { Building2, Users, CreditCard, Bell, FolderCheck } from 'lucide-react'

const features = [
  {
    icon: Building2,
    title: 'Register Your Business',
    description: 'Create your business profile in minutes and get started immediately.',
    color: 'purple',
  },
  {
    icon: Users,
    title: 'Add Your Clients',
    description: 'Add clients easily and manage all your business relationships.',
    color: 'green',
  },
  {
    icon: CreditCard,
    title: 'Upload Payments',
    description: 'Upload when you send payments, track due dates effortlessly.',
    color: 'orange',
  },
  {
    icon: Bell,
    title: 'AI Reminders',
    description: 'Our AI bot reminds you at the right time, every time.',
    color: 'cyan',
  },
  {
    icon: FolderCheck,
    title: 'Stay Organized',
    description: 'Keep everything in order — clients, payments, reminders, all in one place.',
    color: 'pink',
  },
]

const colorClasses = {
  purple: 'bg-purple/10 text-purple',
  green: 'bg-emerald-500/10 text-emerald-500',
  orange: 'bg-orange/10 text-orange',
  cyan: 'bg-cyan/10 text-cyan',
  pink: 'bg-pink/10 text-pink',
}

export function Features() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Stay Ahead
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help you manage clients, track payments, and grow your business.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-lg hover:border-purple/30 transition-all duration-300"
            >
              <div className={`inline-flex p-3 rounded-xl mb-4 ${colorClasses[feature.color as keyof typeof colorClasses]}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
