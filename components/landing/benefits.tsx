import { Clock, Banknote, Heart, TrendingUp } from 'lucide-react'

const benefits = [
  {
    icon: Clock,
    title: 'Save Time',
    description: 'Automate reminders and focus on what matters most for your business.',
  },
  {
    icon: Banknote,
    title: 'Reduce Missed Payments',
    description: 'Timely reminders mean better cash flow and fewer payment delays.',
  },
  {
    icon: Heart,
    title: 'Build Stronger Relationships',
    description: 'Stay professional and never miss a commitment to your clients.',
  },
  {
    icon: TrendingUp,
    title: 'Grow Your Business',
    description: 'More efficiency means more time to focus on growth and new opportunities.',
  },
]

export function Benefits() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple via-pink to-cyan">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Businesses Love Us
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Join thousands of businesses that trust AI Supports Bots to manage their client payments.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="glass-dark rounded-2xl p-6 text-center"
            >
              <div className="inline-flex p-4 rounded-full bg-white/20 mb-4">
                <benefit.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-sm text-white/80 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
