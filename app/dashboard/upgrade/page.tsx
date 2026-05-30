import { MessageCircle, Copy, Check, Crown, Zap, Shield, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const OPAY_ACCOUNT = '7067569737'
const WHATSAPP_SUPPORT = '07067569737'

const proFeatures = [
  { icon: Zap, title: 'Unlimited Clients', description: 'Add as many clients as your business needs' },
  { icon: Bell, title: 'Advanced Reminders', description: 'Email and SMS payment reminders' },
  { icon: Shield, title: 'Priority Support', description: 'Get help faster with dedicated support' },
  { icon: Crown, title: 'Premium Features', description: 'Access to advanced reporting and analytics' },
]

export default function UpgradePage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex p-4 rounded-full bg-orange/10 mb-4">
          <Crown className="h-8 w-8 text-orange" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Upgrade to Pro</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Unlock unlimited clients, advanced features, and priority support for your business.
        </p>
      </div>

      {/* Features */}
      <div className="grid sm:grid-cols-2 gap-4">
        {proFeatures.map((feature) => (
          <div key={feature.title} className="bg-card rounded-xl p-6 border border-border/50">
            <div className="p-3 rounded-xl bg-purple/10 inline-block mb-4">
              <feature.icon className="h-6 w-6 text-purple" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Payment Section */}
      <div className="bg-card rounded-xl p-8 border border-border/50">
        <h2 className="text-xl font-bold text-foreground mb-6 text-center">How to Upgrade</h2>
        
        <div className="space-y-6">
          {/* Step 1 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple text-white flex items-center justify-center font-bold text-sm">
              1
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">Make Payment</h3>
              <div className="p-4 rounded-xl bg-orange/10 border border-orange/20">
                <p className="text-sm text-muted-foreground mb-2">Transfer to:</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground">Bank: <span className="font-semibold text-foreground">Opay</span></p>
                    <p className="text-muted-foreground">Account: <span className="font-bold text-foreground text-lg">{OPAY_ACCOUNT}</span></p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(OPAY_ACCOUNT)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple text-white flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">Contact Support</h3>
              <p className="text-sm text-muted-foreground mb-3">
                After payment, contact us on WhatsApp with your payment receipt to activate your Pro plan.
              </p>
              <Button 
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white"
                asChild
              >
                <a 
                  href={`https://wa.me/234${WHATSAPP_SUPPORT.slice(1)}?text=Hi, I just made a payment for AI Supports Bots Pro plan. My email is: `}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact on WhatsApp: {WHATSAPP_SUPPORT}
                </a>
              </Button>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple text-white flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">Get Activated</h3>
              <p className="text-sm text-muted-foreground">
                Once we confirm your payment, your account will be upgraded to Pro within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center">
        <Button variant="outline" asChild>
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}
