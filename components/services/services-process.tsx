"use client"

import { motion } from "framer-motion"
import { ClipboardCheck, FileSearch, MessageSquare, Settings, UserCheck, Zap } from "lucide-react"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"

export default function ServiceProcess() {
  const steps = [
    {
      icon: <MessageSquare className="h-8 w-8 text-[#00A7E1]" />,
      title: "Consulta Inicial",
      description: "Realizamos uma consulta inicial para entender as necessidades específicas do seu negócio.",
    },
    {
      icon: <FileSearch className="h-8 w-8 text-[#00A7E1]" />,
      title: "Análise de Documentos",
      description: "Analisamos a documentação da sua empresa para identificar oportunidades e desafios.",
    },
    {
      icon: <Settings className="h-8 w-8 text-[#00A7E1]" />,
      title: "Planejamento Estratégico",
      description: "Desenvolvemos um plano estratégico personalizado para atender às suas necessidades.",
    },
    {
      icon: <ClipboardCheck className="h-8 w-8 text-[#00A7E1]" />,
      title: "Implementação",
      description: "Implementamos as soluções contábeis definidas no planejamento estratégico.",
    },
    {
      icon: <Zap className="h-8 w-8 text-[#00A7E1]" />,
      title: "Execução Contínua",
      description: "Executamos os serviços contábeis de forma contínua, garantindo qualidade e eficiência.",
    },
    {
      icon: <UserCheck className="h-8 w-8 text-[#00A7E1]" />,
      title: "Acompanhamento e Suporte",
      description: "Oferecemos acompanhamento constante e suporte para garantir a satisfação do cliente.",
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
                Nosso Processo
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Como Trabalhamos para Entregar Excelência
              </h2>
              <p className="text-gray-500 md:text-xl max-w-[700px] mx-auto">
                Conheça o processo que seguimos para garantir a qualidade e eficiência dos nossos serviços.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <AnimateOnScroll key={index} variant="fade-up" delay={index * 100} duration={0.6}>
              <motion.div
                className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-all duration-300"
                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#00A7E1]/10 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#00A7E1] text-white text-xs font-bold">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
