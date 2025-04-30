"use client"

import { Shield, Clock, Zap, TrendingUp, Users, HeartHandshake } from "lucide-react"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"
import { useState } from "react"
import { motion } from "framer-motion"
import TaxCalculator from "@/components/shared/tax-calculator"

export default function Advantages() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const advantages = [
    {
      icon: <Shield className="h-12 w-12 text-[#00A7E1]" />,
      title: "Segurança",
      description: "Seus dados contábeis protegidos com os mais altos padrões de segurança.",
    },
    {
      icon: <Clock className="h-12 w-12 text-[#00A7E1]" />,
      title: "Pontualidade",
      description: "Cumprimento rigoroso de prazos para todas as obrigações fiscais.",
    },
    {
      icon: <Zap className="h-12 w-12 text-[#00A7E1]" />,
      title: "Agilidade",
      description: "Processos otimizados para entregas rápidas e eficientes.",
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-[#00A7E1]" />,
      title: "Crescimento",
      description: "Foco em estratégias que impulsionam o crescimento do seu negócio.",
    },
    {
      icon: <Users className="h-12 w-12 text-[#00A7E1]" />,
      title: "Equipe Qualificada",
      description: "Profissionais especializados e em constante atualização.",
    },
    {
      icon: <HeartHandshake className="h-12 w-12 text-[#00A7E1]" />,
      title: "Atendimento Humanizado",
      description: "Relacionamento próximo e personalizado com cada cliente.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-gray-50 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00A7E1]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00A7E1]/5 rounded-full blur-3xl"></div>
      </div>


      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimateOnScroll variant="fade-up" duration={0.8}>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block bg-[#00A7E1]/10 text-[#00A7E1] px-3 py-1 rounded-full text-sm font-medium mb-2">
                Diferenciais
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nossos Diferenciais</h2>
              <p className="max-w-[700px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                O que nos torna a escolha certa para cuidar da contabilidade do seu negócio
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Coluna da esquerda - Vantagens */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {advantages.map((advantage, index) => (
                <AnimateOnScroll key={index} variant="fade-up" delay={index * 100} duration={0.6}>
                  <motion.div
                    className={`flex flex-col items-center text-center space-y-3 p-6 rounded-xl transition-all duration-500 ${
                      hoveredIndex === index
                        ? "bg-white shadow-lg transform -translate-y-2"
                        : "hover:bg-white hover:shadow-md hover:-translate-y-1"
                    }`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    whileHover={{ y: -8 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <motion.div
                      className={`p-4 rounded-full bg-[#e6f7fd]`}
                      animate={{
                        scale: hoveredIndex === index ? 1.1 : 1,
                        backgroundColor: hoveredIndex === index ? "rgba(0, 167, 225, 0.2)" : "rgba(230, 247, 253, 1)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {advantage.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold">{advantage.title}</h3>
                    <p className="text-gray-500">{advantage.description}</p>

                    {/* Animated underline */}
                    <motion.div
                      className="h-0.5 bg-[#00A7E1] rounded-full overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{ width: hoveredIndex === index ? "4rem" : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>

          {/* Coluna da direita - Calculadora de impostos */}
          <div className="lg:col-span-1">
            <AnimateOnScroll variant="fade-left" duration={0.8} delay={300}>
              <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                <TaxCalculator />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  )
}
