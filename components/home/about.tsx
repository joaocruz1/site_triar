"use client"

import Image from "next/image"
import { CheckCircle } from "lucide-react"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"
import { motion } from "framer-motion"

export default function About() {
  const highlights = [
    "Mais de 10 anos de experiência no mercado",
    "Equipe de contadores especializados",
    "Atendimento personalizado para cada cliente",
    "Tecnologia avançada para processos eficientes",
  ]

  return (
    <section id="about" className="w-full py-12 md:py-24 bg-white relative overflow-hidden">
      <div className="container m-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Imagem - agora vem primeiro em mobile */}
          <div className="w-full order-1 lg:order-2">
            <AnimateOnScroll variant="fade-right" duration={0.8}>
              <div className="relative h-[300px] sm:h-[400px] w-full max-w-[600px] mx-auto">
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl bg-gray-200">
                  <Image
                    src="/img/home/about-home.png"
                    alt="Sobre a Triar Contabilidade"
                    fill
                    className="object-cover"
                    quality={100}
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Floating badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-[#00A7E1] font-bold">10+</span>
                    <span className="text-sm">Anos de experiência</span>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Conteúdo textual */}
          <div className="w-full order-2 lg:order-1">
            <AnimateOnScroll variant="fade-left" duration={0.8}>
              <div className="space-y-4 text-center lg:text-left">
                <div className="inline-block bg-[#00A7E1]/10 text-[#00A7E1] px-3 py-1 rounded-full text-sm font-medium">
                  Sobre Nós
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Sobre a Triar Contabilidade
                </h2>
                <div className="space-y-3">
                  <p className="text-gray-500 md:text-lg">
                    Somos uma empresa especializada em serviços contábeis, com foco em oferecer soluções personalizadas
                    para cada cliente.
                  </p>
                  <p className="text-gray-500 md:text-lg">
                    Nossa missão é proporcionar tranquilidade para que nossos clientes possam focar no crescimento de seus
                    negócios, enquanto cuidamos de toda a parte contábil e fiscal.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll variant="fade-left" delay={200} duration={0.8}>
              <ul className="space-y-3 mt-6">
                {highlights.map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-3 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index + 0.5 }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00A7E1]/10 flex items-center justify-center group-hover:bg-[#00A7E1]/20 transition-colors duration-300">
                      <CheckCircle className="h-4 w-4 text-[#00A7E1]" />
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </AnimateOnScroll>

            {/* Animated counter */}
            <AnimateOnScroll variant="fade-up" delay={400} duration={0.8}>
              <div className="grid grid-cols-2 gap-4 mt-8 max-w-md mx-auto lg:mx-0">
                <motion.div
                  className="bg-gray-50 p-4 rounded-lg"
                  whileHover={{ y: -5, boxShadow: "0 4px 20px rgba(0, 167, 225, 0.1)" }}
                >
                  <div className="text-3xl font-bold text-[#00A7E1]">500+</div>
                  <div className="text-sm text-gray-500">Clientes atendidos</div>
                </motion.div>
                <motion.div
                  className="bg-gray-50 p-4 rounded-lg"
                  whileHover={{ y: -5, boxShadow: "0 4px 20px rgba(0, 167, 225, 0.1)" }}
                >
                  <div className="text-3xl font-bold text-[#00A7E1]">98%</div>
                  <div className="text-sm text-gray-500">Satisfação dos clientes</div>
                </motion.div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  )
}