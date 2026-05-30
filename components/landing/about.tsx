import { Bot, Shield, Clock, Users, Award, Heart } from 'lucide-react'
import Image from 'next/image'

const stats = [
  { label: 'Businesses Served', value: '1,000+' },
  { label: 'Reminders Sent', value: '50K+' },
  { label: 'Payment Success Rate', value: '98%' },
  { label: 'Customer Satisfaction', value: '4.9/5' },
]

const values = [
  {
    icon: Shield,
    title: 'Security First',
    description: 'Bank-grade security with fraud detection and protection for all your business data.',
  },
  {
    icon: Clock,
    title: 'Always On Time',
    description: 'Never miss a payment deadline with our AI-powered reminder system.',
  },
  {
    icon: Users,
    title: 'Customer Focused',
    description: 'Built by business owners for business owners. We understand your needs.',
  },
  {
    icon: Heart,
    title: 'Passionate Team',
    description: 'A dedicated team committed to helping Nigerian businesses thrive.',
  },
]

export function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-cyan/10 text-cyan mb-4">
            About Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Empowering Businesses with <span className="gradient-text">Smart Technology</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            AI Supports Bots was built to help Nigerian businesses manage their clients, track payments, 
            and automate reminders so you can focus on what matters most - growing your business.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-2xl font-bold text-navy mb-4">Our Story</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Founded by Norman Dan Baka, AI Supports Bots started from a simple observation: 
              too many businesses were losing revenue due to missed payment reminders and poor client management.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              We built a solution that combines the power of artificial intelligence with intuitive 
              design to create a platform that any business owner can use - from small shops to large enterprises.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, we serve over 1,000 businesses across Nigeria, helping them save time, 
              reduce missed payments, and build stronger relationships with their clients.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple/20 to-cyan/20 flex items-center justify-center">
              <Image
                src="/images/ai-robot.png"
                alt="AI Supports Bots Mascot"
                width={400}
                height={400}
                className="animate-spin-slow"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple/20 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-cyan/20 rounded-full blur-xl" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-2xl glass border border-gray-100">
              <p className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-navy text-center mb-12">Our Core Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="p-6 rounded-2xl glass border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="inline-flex p-3 rounded-xl gradient-purple-pink mb-4">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-bold text-navy mb-2">{value.title}</h4>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div className="max-w-4xl mx-auto text-center p-8 rounded-2xl bg-gradient-to-r from-purple/10 via-pink/10 to-cyan/10 border border-purple/20">
          <Award className="h-12 w-12 text-purple mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-navy mb-4">Our Mission</h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            To empower every Nigerian business with intelligent tools that automate tedious tasks, 
            prevent revenue loss, and create meaningful connections between businesses and their clients. 
            We believe technology should work for you, not the other way around.
          </p>
        </div>
      </div>
    </section>
  )
}
