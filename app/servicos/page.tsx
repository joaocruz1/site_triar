"use-client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import ServicesHero from "@/components/services/services-hero"
import ServiceProcess from "@/components/services/services-process"
import CallToAction from "@/components/shared/call-to-action"
import dynamic from "next/dynamic"

// Carregar componentes pesados dinamicamente
const DynamicServicesList = dynamic(() => import("@/components/services/services-list"), {
  ssr: true,
  loading: () => <div className="w-full py-16 md:py-24 bg-gray-50"></div>,
})

const DynamicServicesFAQ = dynamic(() => import("@/components/services/services-faq"), {
  ssr: true,
  loading: () => <div className="w-full py-16 md:py-24 bg-gray-50"></div>,
})

export const metadata = {
  title: "Serviços | Triar Contabilidade",
  description: "Conheça os serviços contábeis oferecidos pela Triar Contabilidade",
}

export default function ServicosPage() {
  return (
      <main className="min-h-screen">
        <Header />
        <ServicesHero />
        <DynamicServicesList />
        <ServiceProcess />
        <DynamicServicesFAQ />
        <CallToAction />
        <Footer />
      </main>
  )
}
