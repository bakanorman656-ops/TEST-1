'use client'

import { Check, Zap, Crown, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: '0',
    period: 'forever',
    description: 'Get started with basic features',
    features: [
      'Up to 50 clients per business',
      '10 AI chatbot messages',
      'Basic payment reminders',
      'Email support',
    ],
    cta: 'Get Started Free',
    href: '/sign-up',
    popular: false,
    icon: Zap,
    gradient: 'from-gray-500 to-gray-600',
  },
  {
    name: 'Monthly Pro',
    price: '5,000',
    period: '/month',
    description: 'Perfect for growing businesses',
    features: [
      'Unlimited clients',
      'Unlimited AI chatbot messages',
      'Custom reminder scheduling',
      'Priority support',
      'Advanced analytics',
      'WhatsApp integration',
    ],
    cta: 'Subscribe Monthly',
    href: '/dashboard/upgrade?plan=monthly',
    popular: true,
    icon: Crown,
    gradient: 'from-purple to-pink',
  },
  {
    name: 'Yearly Pro',
    price: '10,000',
    period: '/year',
    description: 'Best value - Save 83%',
    features: [
      'Everything in Monthly Pro',
      '2 months FREE',
      'Dedicated account manager',
      'Custom branding',
      'API access',
      'Fraud protection alerts',
    ],
    cta: 'Subscribe Yearly',
    href: '/dashboard/upgrade?plan=yearly',
    popular: false,
    icon: Crown,
    gradient: 'from-cyan to-purple',
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-background to-purple/5">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-purple/10 text-purple mb-4">
            Simple Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Choose Your <span className="gradient-text">Perfect Plan</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Start free, upgrade when you need more. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Chatbot Pricing Notice */}
        <div className="max-w-2xl mx-auto mb-12 p-6 rounded-2xl glass border border-purple/20 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <MessageCircle className="h-6 w-6 text-purple" />
            <h3 className="font-bold text-lg text-navy">AI Chatbot Usage</h3>
          </div>
          <p className="text-muted-foreground mb-2">
            Every user gets <span className="font-bold text-purple">10 FREE AI chatbot messages</span>.
          </p>
          <p className="text-sm text-muted-foreground">
            After that, subscribe to a Pro plan to continue using the AI assistant.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? 'bg-navy text-white shadow-2xl shadow-purple/20 scale-105'
                  : 'glass border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange to-pink text-white">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${plan.gradient} mb-6`}>
                <plan.icon className="h-6 w-6 text-white" />
              </div>

              <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-navy'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-6 ${plan.popular ? 'text-white/70' : 'text-muted-foreground'}`}>
                {plan.description}
              </p>

              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-navy'}`}>
                  {plan.price === '0' ? 'Free' : `N${plan.price}`}
                </span>
                {plan.price !== '0' && (
                  <span className={plan.popular ? 'text-white/70' : 'text-muted-foreground'}>
                    {plan.period}
                  </span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`h-5 w-5 flex-shrink-0 ${plan.popular ? 'text-cyan' : 'text-purple'}`} />
                    <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-muted-foreground'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={`w-full ${
                  plan.popular
                    ? 'bg-white text-navy hover:bg-white/90'
                    : 'gradient-purple-pink text-white hover:opacity-90'
                }`}
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Payment Info */}
        <div className="mt-16 max-w-2xl mx-auto text-center">
          <div className="p-6 rounded-2xl bg-orange/10 border border-orange/20">
            <h4 className="font-bold text-navy mb-2">Payment Information</h4>
            <p className="text-muted-foreground mb-4">
              Pay via bank transfer to complete your subscription:
            </p>
            <div className="bg-white rounded-xl p-4 inline-block">
              <p className="font-bold text-navy text-lg">Opay Bank</p>
              <p className="text-2xl font-bold text-purple">7067569737</p>
              <p className="text-sm text-muted-foreground mt-1">Account Name: AI Supports Bots</p>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              After payment, contact us on{' '}
              <a href="https://wa.me/2347067569737" className="text-purple font-semibold hover:underline">
                WhatsApp: 07067569737
              </a>{' '}
              for instant activation.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
