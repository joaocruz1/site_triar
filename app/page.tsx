import Header from "@/components/layout/header"
import Hero from "@/components/home/hero"
import Services from "@/components/home/services"
import About from "@/components/home/about"
import CallToAction from "@/components/shared/call-to-action"
import Footer from "@/components/layout/footer"
import dynamic from "next/dynamic"

// Carregar componentes pesados dinamicamente para melhorar a performance inicial
// Improved dynamic loading with proper loading states and suspense
const DynamicAdvantages = dynamic(() => import("@/components/home/advantages"), {
  ssr: true, // Changed to false to reduce server load and initial JS bundle
  loading: () => (
    <div className="w-full py-12 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 h-[400px] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-[#00A7E1] border-t-transparent animate-spin"></div>
      </div>
    </div>
  ),
})

const DynamicTestimonials = dynamic(() => import("@/components/home/testimonials"), {
  ssr: true, // Changed to false to reduce server load and initial JS bundle
  loading: () => (
    <div className="w-full py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4 h-[400px] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-[#00A7E1] border-t-transparent animate-spin"></div>
      </div>
    </div>
  ),
})

// Removed DynamicInteractiveSections to reduce JavaScript and DOM elements

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <About />
      <DynamicAdvantages />
      {/* Removed InteractiveSections component to reduce JavaScript and DOM elements */}
      <DynamicTestimonials />
      <CallToAction />
      <Footer />
    </main>
  )
}