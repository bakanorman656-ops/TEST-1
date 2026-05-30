'use client'

import { useState } from 'react'
import { X, MessageCircle, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface UpgradeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentCount?: number
  limit?: number
}

const OPAY_ACCOUNT = '7067569737'
const WHATSAPP_SUPPORT = '07067569737'

export function UpgradeModal({ open, onOpenChange, currentCount, limit }: UpgradeModalProps) {
  const [copied, setCopied] = useState(false)

  const copyAccount = () => {
    navigator.clipboard.writeText(OPAY_ACCOUNT)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Upgrade to Pro</DialogTitle>
          <DialogDescription>
            {currentCount !== undefined && limit !== undefined && (
              <span className="text-destructive font-medium">
                You have reached {currentCount}/{limit} clients on the free plan.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Benefits */}
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Pro Plan Benefits:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>- Unlimited clients per business</li>
              <li>- Priority AI assistance</li>
              <li>- Advanced reporting</li>
              <li>- Email & SMS reminders</li>
              <li>- Priority customer support</li>
            </ul>
          </div>

          {/* Payment Info */}
          <div className="p-4 rounded-xl bg-orange/10 border border-orange/20">
            <h4 className="font-semibold text-foreground mb-3">Payment Information</h4>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">Bank: <span className="font-semibold text-foreground">Opay</span></p>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  Account: <span className="font-semibold text-foreground">{OPAY_ACCOUNT}</span>
                </p>
                <Button variant="ghost" size="sm" onClick={copyAccount}>
                  {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* WhatsApp Contact */}
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <h4 className="font-semibold text-foreground mb-2">After Payment</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Contact us on WhatsApp with your payment receipt to activate your Pro plan.
            </p>
            <Button 
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
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
      </DialogContent>
    </Dialog>
  )
}
