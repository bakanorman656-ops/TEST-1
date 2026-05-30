import { Settings as SettingsIcon, Bell, Globe, Shield, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences</p>
      </div>

      {/* Settings Options */}
      <div className="space-y-4">
        <div className="bg-card rounded-xl p-6 border border-border/50">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-purple/10">
              <Bell className="h-6 w-6 text-purple" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Notifications</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Manage how you receive payment reminders and updates.
              </p>
              <p className="text-xs text-muted-foreground italic">
                Coming soon - Email and SMS notification settings
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border/50">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-cyan/10">
              <Globe className="h-6 w-6 text-cyan" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Language & Region</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Set your preferred language and currency format.
              </p>
              <p className="text-xs text-muted-foreground italic">
                Coming soon - Language and currency preferences
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border/50">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-orange/10">
              <Shield className="h-6 w-6 text-orange" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Security</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Update your password and security settings.
              </p>
              <p className="text-xs text-muted-foreground italic">
                Coming soon - Password change and 2FA
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="bg-card rounded-xl p-6 border border-border/50">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10">
            <MessageCircle className="h-6 w-6 text-emerald-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">Customer Support</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Need help? Contact our support team on WhatsApp.
            </p>
            <Button 
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
              asChild
            >
              <a 
                href="https://wa.me/2347067569737"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp: 07067569737
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Upgrade CTA */}
      <div className="bg-gradient-to-r from-purple to-pink p-6 rounded-xl text-white">
        <h3 className="font-semibold mb-2">Upgrade to Pro</h3>
        <p className="text-white/80 text-sm mb-4">
          Get unlimited clients, advanced features, and priority support.
        </p>
        <Button variant="secondary" asChild>
          <Link href="/dashboard/upgrade">Upgrade Now</Link>
        </Button>
      </div>
    </div>
  )
}
