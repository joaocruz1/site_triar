import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import AboutHero from "@/components/about/about-hero"
import OurHistory from "@/components/about/our-history"
import CallToAction from "@/components/shared/call-to-action"
import dynamic from "next/dynamic"

// Carregar componentes pesados dinamicamente
const DynamicOurValues = dynamic(() => import("@/components/about/our-values"), {
  ssr: true,
  loading: () => <div className="w-full py-16 md:py-24 bg-white"></div>,
})

const DynamicOurTeam = dynamic(() => import("@/components/about/our-team"), {
  ssr: true,
  loading: () => <div className="w-full py-16 md:py-24 bg-gray-50"></div>,
})

export const metadata = {
  title: "Sobre Nós | Triar Contabilidade",
  description: "Conheça a história, valores e equipe da Triar Contabilidade",
}

export default function SobrePage() {
  return (
      <main className="min-h-screen">
        <Header />
        <AboutHero />
        <OurHistory />
        <DynamicOurValues />
        <DynamicOurTeam />
        <CallToAction />
        <Footer />
      </main>
  )
}
