"use client"

import { motion } from "framer-motion"
import { Award, Heart, Lightbulb, Target, Users, Zap } from "lucide-react"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"

export default function OurValues() {
  const values = [
    {
      icon: <Award className="h-8 w-8 text-[#00A7E1]" />,
      title: "Excelência",
      description: "Buscamos a excelência em tudo o que fazemos, garantindo a qualidade dos nossos serviços.",
    },
    {
      icon: <Heart className="h-8 w-8 text-[#00A7E1]" />,
      title: "Comprometimento",
      description: "Estamos comprometidos com o sucesso dos nossos clientes e com a ética profissional.",
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-[#00A7E1]" />,
      title: "Inovação",
      description: "Investimos constantemente em tecnologia e inovação para oferecer as melhores soluções.",
    },
    {
      icon: <Target className="h-8 w-8 text-[#00A7E1]" />,
      title: "Foco no Cliente",
      description:
        "Colocamos as necessidades dos nossos clientes em primeiro lugar, oferecendo atendimento personalizado.",
    },
    {
      icon: <Users className="h-8 w-8 text-[#00A7E1]" />,
      title: "Trabalho em Equipe",
      description: "Valorizamos o trabalho em equipe e a colaboração para alcançar os melhores resultados.",
    },
    {
      icon: <Zap className="h-8 w-8 text-[#00A7E1]" />,
      title: "Agilidade",
      description: "Trabalhamos com agilidade e eficiência para atender às demandas dos nossos clientes.",
    },
  ]

  return (
    <section className="w-full py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00A7E1]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00A7E1]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <AnimateOnScroll variant="fade-up" duration={0.8}>
          <div className="flex flex-col items-center text-center mb-12">
            <div className="space-y-2">
              <div className="inline-block bg-[#00A7E1]/10 text-[#00A7E1] px-3 py-1 rounded-full text-sm font-medium mb-2">
                Nossos Valores
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Princípios que Guiam Nosso Trabalho</h2>
              <p className="text-gray-500 md:text-xl max-w-[700px] mx-auto">
                Conheça os valores que norteiam nossas ações e definem quem somos como empresa.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <AnimateOnScroll key={index} variant="fade-up" delay={index * 100} duration={0.6}>
              <motion.div
                className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-all duration-300"
                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-[#00A7E1]/10 rounded-full">{value.icon}</div>
                  <h3 className="text-xl font-bold">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </motion.div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
