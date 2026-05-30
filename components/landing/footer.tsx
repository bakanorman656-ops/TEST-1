import Link from 'next/link'
import { Bot, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Footer() {
  return (
    <footer className="bg-navy text-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-purple-pink">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold">AI Supports Bots</span>
                <p className="text-xs text-white/60">Smart Support. Stronger Business.</p>
              </div>
            </div>
            <p className="text-white/70 text-sm max-w-md mb-6 leading-relaxed">
              AI-powered payment reminder and business management platform. Register your business, manage clients, and never miss a payment again.
            </p>
            
            {/* WhatsApp Support */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 border border-white/20 max-w-sm">
              <div className="p-2 rounded-full bg-emerald-500/20">
                <MessageCircle className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Need Help? Contact Support</p>
                <a 
                  href="https://wa.me/2347067569737" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-400 font-semibold hover:underline"
                >
                  WhatsApp: 07067569737
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/sign-up" className="hover:text-white transition-colors">Get Started</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Project Team Credits */}
        <div className="pt-8 border-t border-white/20 mb-8">
          <h4 className="font-semibold mb-4 text-center text-white/90">Project Team</h4>
          
          {/* Founder */}
          <p className="text-center text-sm text-white/70 mb-4">
            <span className="text-white font-medium">Founder:</span> Norman Dan Baka
          </p>
          
          {/* Team Members */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-white/60 mb-4">
            <span>Mrs Agape</span>
            <span className="text-white/30">|</span>
            <span>Mr Attat Emmanuel Uduak</span>
            <span className="text-white/30">|</span>
            <span>Mr Suleiman Manaja</span>
            <span className="text-white/30">|</span>
            <span>Mrs Linda Suleiman</span>
            <span className="text-white/30">|</span>
            <span>Stephanie Bitram</span>
            <span className="text-white/30">|</span>
            <span>Stacy Bitram</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-white/60 mb-4">
            <span>Barrister Jemimah Baka</span>
            <span className="text-white/30">|</span>
            <span>Tehilah Baka</span>
            <span className="text-white/30">|</span>
            <span>Miss Shaniel</span>
            <span className="text-white/30">|</span>
            <span>Miss Esther</span>
          </div>
          
          {/* Biggest Support */}
          <p className="text-center text-sm text-white/70 mb-2">
            <span className="text-cyan font-medium">Biggest Support:</span>{' '}
            Mr Micheal Baka, Mrs Aisaba Baka
          </p>
          
          {/* Courtesy */}
          <p className="text-center text-sm text-white/50">
            Courtesy: Michael Geonology
          </p>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/60">
            &copy; {new Date().getFullYear()} AI Supports Bots. All rights reserved.
          </p>
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
            <Link href="/sign-up">Get Started Free</Link>
          </Button>
        </div>
      </div>
    </footer>
  )
}
