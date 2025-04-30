import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import ParallaxProvider from "@/components/shared/parallax-provider"
import AnimatedBackground from "@/components/shared/animated-background"
import ContactHero from "@/components/contact/contact-hero"
import ContactForm from "@/components/contact/contact-form"
import ContactInfo from "@/components/contact/contact-info"
import dynamic from "next/dynamic"

// Carregar o mapa dinamicamente para melhorar a performance
const DynamicContactMap = dynamic(() => import("@/components/contact/contact-map"), {
  ssr: true,
  loading: () => <div className="w-full py-12 bg-gray-50 h-[450px]"></div>,
})

export const metadata = {
  title: "Contato | Triar Contabilidade",
  description: "Entre em contato com a Triar Contabilidade para solicitar um orçamento ou tirar dúvidas",
}

export default function ContatoPage() {
  return (
    <ParallaxProvider>
      <main className="min-h-screen">
        <AnimatedBackground color="rgba(0, 167, 225, 0.1)" density={15} />
        <Header />
        <ContactHero />
        <div className="container px-4 md:px-6 py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
        <DynamicContactMap />
        <Footer />
      </main>
    </ParallaxProvider>
  )
}
