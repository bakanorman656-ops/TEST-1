'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bot, BarChart3, Building2, Users, CreditCard, Bell, TrendingUp, Settings, User, LogOut, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const menuItems = [
  { href: '/dashboard', icon: BarChart3, label: 'Dashboard' },
  { href: '/dashboard/businesses', icon: Building2, label: 'Businesses' },
  { href: '/dashboard/clients', icon: Users, label: 'Clients' },
  { href: '/dashboard/payments', icon: CreditCard, label: 'Payments' },
  { href: '/dashboard/reminders', icon: Bell, label: 'Reminders' },
  { href: '/dashboard/reports', icon: TrendingUp, label: 'Reports' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
  { href: '/dashboard/profile', icon: User, label: 'Profile' },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleSignOut = async () => {
    await authClient.signOut()
    router.push('/')
    router.refresh()
  }

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-purple-pink">
          <Bot className="h-6 w-6 text-white" />
        </div>
        <div>
          <span className="font-bold text-white">AI Supports</span>
          <p className="text-xs text-white/60">Bots</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 flex-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive 
                  ? 'bg-purple text-white' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Upgrade Card */}
      <div className="mt-4 p-4 rounded-xl bg-white/10 border border-white/20">
        <p className="font-semibold text-sm text-white mb-1">Upgrade to Pro</p>
        <p className="text-xs text-white/60 mb-3">Unlock more features and add more clients.</p>
        <Button 
          size="sm" 
          className="w-full bg-orange hover:bg-orange/90 text-white border-0"
          asChild
        >
          <Link href="/dashboard/upgrade">Upgrade Now</Link>
        </Button>
      </div>

      {/* Sign Out */}
      <button
        onClick={handleSignOut}
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white mt-4 w-full transition-colors"
      >
        <LogOut className="h-5 w-5" />
        Sign Out
      </button>
    </>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-navy text-white"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        flex flex-col w-64 bg-navy text-white p-4
        transform transition-transform duration-200
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <NavContent />
      </aside>
    </>
  )
}
