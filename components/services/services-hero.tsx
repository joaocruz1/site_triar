"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"

export default function ServicesHero() {
  return (
    <section className="w-full py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#00A7E1]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00A7E1]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <AnimateOnScroll variant="fade-right" duration={0.8}>
            <div className="space-y-4">
              <div className="inline-block bg-[#00A7E1]/10 text-[#00A7E1] px-3 py-1 rounded-full text-sm font-medium mb-2">
                Nossos Serviços
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Soluções Contábeis <span className="text-[#00A7E1]">Personalizadas</span>
              </h1>
              <p className="text-gray-500 md:text-xl max-w-[600px]">
                Oferecemos uma ampla gama de serviços contábeis para atender às necessidades específicas do seu negócio,
                com foco em qualidade, eficiência e resultados.
              </p>
              <ul className="space-y-2 mt-4">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#00A7E1]"></div>
                  <span className="text-gray-700">Contabilidade Empresarial</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#00A7E1]"></div>
                  <span className="text-gray-700">Departamento Fiscal</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#00A7E1]"></div>
                  <span className="text-gray-700">Planejamento Tributário</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#00A7E1]"></div>
                  <span className="text-gray-700">Departamento Pessoal</span>
                </li>
              </ul>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-left" duration={0.8}>
            <div className="relative flex justify-center ">
              <div className="relative w-full m-auto h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/img/services/hero-services.png"
                  alt="Serviços Triar Contabilidade"
                  fill
                  className="object-cover"
                  quality={100} 
                  priority 
                  sizes="(max-width: 768px) 100vw, 50vw" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold">Serviços Especializados</h3>
                    <p className="text-white/80">Para empresas de todos os portes e segmentos</p>
                  </motion.div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-[#00A7E1]/10 rounded-full"></div>
              <div className="absolute -top-5 -left-5 w-24 h-24 border-2 border-[#00A7E1]/20 rounded-full"></div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
