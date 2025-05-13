import Header from "@/components/layout/header"
import Hero from "@/components/home/hero"
import Services from "@/components/home/services"
import About from "@/components/home/about"
import CallToAction from "@/components/shared/call-to-action"
import Footer from "@/components/layout/footer"
import dynamic from "next/dynamic"

// Carregar componentes pesados dinamicamente para melhorar a performance inicial
const DynamicAdvantages = dynamic(() => import("@/components/home/advantages"), {
  ssr: true,
  loading: () => <div className="w-full py-12 md:py-24 bg-gray-50"></div>,
})

const DynamicTestimonials = dynamic(() => import("@/components/home/testimonials"), {
  ssr: true,
  loading: () => <div className="w-full py-12 md:py-24 bg-white"></div>,
})

const DynamicInteractiveSections = dynamic(() => import("@/components/interactive/interactive-sections"), {
  ssr: true,
  loading: () => <div className="w-full py-16 md:py-24 bg-gray-50"></div>,
})

export default function Home() {
  return (

      <main className="min-h-screen w-full">
        <Header />
        <Hero />
        <Services />
        <About />
        <DynamicAdvantages />
        <DynamicInteractiveSections />
        <DynamicTestimonials />
        <CallToAction />
        <Footer />
      </main>

  )
}
