"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"

export default function AboutHero() {
  return (
    <section className="w-full py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#00A7E1]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00A7E1]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <AnimateOnScroll variant="fade-up" duration={0.8}>
            <div className="space-y-4">
              <div className="inline-block bg-[#00A7E1]/10 text-[#00A7E1] px-3 py-1 rounded-full text-sm font-medium mb-2">
                Sobre Nós
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Conheça a <span className="text-[#00A7E1]">Triar Contabilidade</span>
              </h1>
              <p className="text-gray-500 md:text-xl max-w-[700px] mx-auto">
                Somos uma empresa especializada em serviços contábeis, com mais de 10 anos de experiência no mercado,
                oferecendo soluções personalizadas para empresas de todos os portes.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-up" delay={200} duration={0.8}>
            <div className="mt-10 relative">
              <div className="relative h-[300px] w-full md:h-[400px] md:w-[700px] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/img/about/about-hero.png"
                  alt="Equipe Triar Contabilidade"
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
                    <h3 className="text-2xl font-bold">Nossa Equipe</h3>
                    <p className="text-white/80">Profissionais dedicados a cuidar do seu negócio</p>
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
