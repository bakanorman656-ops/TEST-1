import { Header } from '@/components/landing/header'
import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { DashboardPreview } from '@/components/landing/dashboard-preview'
import { Pricing } from '@/components/landing/pricing'
import { About } from '@/components/landing/about'
import { Benefits } from '@/components/landing/benefits'
import { Footer } from '@/components/landing/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <DashboardPreview />
        <Pricing />
        <About />
        <Benefits />
      </main>
      <Footer />
    </div>
  )
}
