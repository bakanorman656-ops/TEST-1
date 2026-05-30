import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Play, Bell, CheckCircle, MessageSquare, Send, Clock, TrendingUp } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-purple/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-40 w-72 h-72 bg-pink/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan/20 rounded-full blur-3xl" />
        <div className="absolute top-60 right-80 w-64 h-64 bg-orange/15 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple/10 border border-purple/20">
              <span className="w-2 h-2 rounded-full bg-purple animate-pulse" />
              <span className="text-sm font-medium text-purple">AI-Powered Reminder & Support System</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              AI Support Bots that help your business{' '}
              <span className="gradient-text">grow</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Register your business, manage clients, upload payments and let our AI bot remind you — accurately and on time, every time.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gradient-purple-pink text-white border-0 h-12 px-8" asChild>
                <Link href="/sign-up">Register Your Business</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-6 gap-2" asChild>
                <Link href="#how-it-works">
                  <Play className="h-4 w-4" />
                  How It Works
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Robot with floating cards */}
          <div className="relative flex items-center justify-center min-h-[500px]">
            {/* Robot Image */}
            <div className="relative z-10">
              <Image
                src="/images/ai-robot.png"
                alt="AI Support Bot Mascot"
                width={400}
                height={400}
                className="drop-shadow-2xl animate-spin-slow"
                priority
              />
            </div>

            {/* Floating Feature Cards */}
            <div className="absolute top-8 right-4 lg:right-0 glass rounded-xl p-4 shadow-lg max-w-[200px] animate-float">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-cyan/20">
                  <Clock className="h-4 w-4 text-cyan" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">Accurate & On Time</p>
                  <p className="text-xs text-muted-foreground">AI ensures precise payment reminders.</p>
                </div>
              </div>
            </div>

            <div className="absolute top-32 left-0 lg:-left-8 glass rounded-xl p-4 shadow-lg max-w-[200px] animate-float animation-delay-500">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple/20">
                  <Bell className="h-4 w-4 text-purple" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">Smart Reminders</p>
                  <p className="text-xs text-muted-foreground">Never miss a payment from your clients.</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-32 right-0 lg:right-4 glass rounded-xl p-4 shadow-lg max-w-[200px] animate-float animation-delay-1000">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-orange/20">
                  <CheckCircle className="h-4 w-4 text-orange" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">Easy Management</p>
                  <p className="text-xs text-muted-foreground">Upload payments, track clients, stay organized.</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-4 lg:left-0 glass rounded-xl p-4 shadow-lg max-w-[200px] animate-float animation-delay-1500">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-pink/20">
                  <TrendingUp className="h-4 w-4 text-pink" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">Grow Your Business</p>
                  <p className="text-xs text-muted-foreground">Save time, focus on growth.</p>
                </div>
              </div>
            </div>

            {/* Floating Icons */}
            <div className="absolute top-16 left-20 p-2 rounded-full bg-purple/20 animate-bounce">
              <Bell className="h-4 w-4 text-purple" />
            </div>
            <div className="absolute bottom-40 right-32 p-2 rounded-full bg-cyan/20 animate-bounce" style={{ animationDelay: '0.3s' }}>
              <MessageSquare className="h-4 w-4 text-cyan" />
            </div>
            <div className="absolute top-48 right-24 p-2 rounded-full bg-pink/20 animate-bounce" style={{ animationDelay: '0.5s' }}>
              <Send className="h-4 w-4 text-pink" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
