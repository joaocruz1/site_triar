"use client"

import { useState } from "react"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"
import { motion } from "framer-motion"
import { Calendar, Award, Users, Lightbulb, Building, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function OurHistory() {
  const [activeEvent, setActiveEvent] = useState<number | null>(null)

  const timelineEvents = [
    {
      year: "2010",
      title: "Fundação",
      description:
        "A Triar Contabilidade foi fundada com o objetivo de oferecer serviços contábeis de qualidade para pequenas e médias empresas, com foco em atendimento personalizado e soluções eficientes.",
      icon: <Calendar className="h-5 w-5" />,
      color: "#00A7E1",
      achievement: "Primeiros 50 clientes conquistados",
      image: "/placeholder.svg?height=200&width=300&text=Fundação+2010",
    },
    {
      year: "2013",
      title: "Expansão",
      description:
        "Ampliamos nossa equipe e expandimos nossos serviços para atender mais segmentos do mercado, incluindo e-commerce, startups e empresas de tecnologia, triplicando nossa base de clientes.",
      icon: <Users className="h-5 w-5" />,
      color: "#4CAF50",
      achievement: "Equipe ampliada para 15 profissionais",
      image: "/placeholder.svg?height=200&width=300&text=Expansão+2013",
    },
    {
      year: "2016",
      title: "Digitalização",
      description:
        "Implementamos sistemas digitais avançados para otimizar nossos processos contábeis, reduzindo o tempo de entrega de relatórios em 60% e aumentando a precisão dos nossos serviços.",
      icon: <Lightbulb className="h-5 w-5" />,
      color: "#FF9800",
      achievement: "Redução de 60% no tempo de processamento",
      image: "/placeholder.svg?height=200&width=300&text=Digitalização+2016",
    },
    {
      year: "2019",
      title: "Certificação",
      description:
        "Conquistamos certificações importantes que atestam a qualidade dos nossos serviços, incluindo ISO 9001 e o selo de Excelência em Contabilidade, reforçando nosso compromisso com a qualidade.",
      icon: <Award className="h-5 w-5" />,
      color: "#9C27B0",
      achievement: "Certificação ISO 9001 conquistada",
      image: "/placeholder.svg?height=200&width=300&text=Certificação+2019",
    },
    {
      year: "2022",
      title: "Novo Escritório",
      description:
        "Inauguramos nossa nova sede com infraestrutura moderna para melhor atender nossos clientes, com espaços colaborativos, salas de reunião equipadas com tecnologia de ponta e ambiente sustentável.",
      icon: <Building className="h-5 w-5" />,
      color: "#F44336",
      achievement: "1000m² de espaço moderno e sustentável",
      image: "/placeholder.svg?height=200&width=300&text=Novo+Escritório+2022",
    },
  ]

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-[#00A7E1]/5 rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-[#00A7E1]/5 rounded-full blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-[#00A7E1]/10 rounded-lg rotate-12 opacity-30" />
        <div className="absolute bottom-40 right-20 w-16 h-16 border-2 border-[#00A7E1]/10 rounded-full opacity-20" />
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-[#00A7E1]/5 rounded-md rotate-45" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <AnimateOnScroll variant="fade-up" duration={0.8}>
          <div className="flex flex-col items-center text-center mb-12">
            <div className="space-y-3">
              <motion.div
                className="inline-block bg-[#00A7E1]/10 text-[#00A7E1] px-4 py-1.5 rounded-full text-sm font-medium mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Nossa História
              </motion.div>
              <motion.h2
                className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Uma Trajetória de Sucesso e Crescimento
              </motion.h2>
              <motion.p
                className="text-gray-500 md:text-xl max-w-[700px] mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Conheça a história da Triar Contabilidade e como nos tornamos referência no mercado contábil ao longo
                dos anos.
              </motion.p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Timeline years navigation - visible on mobile */}
        <div className="md:hidden mb-8">
          <div className="flex overflow-x-auto pb-4 scrollbar-hide gap-2 justify-center">
            {timelineEvents.map((event, index) => (
              <button
                key={`mobile-${index}`}
                onClick={() => setActiveEvent(index === activeEvent ? null : index)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeEvent === index
                    ? `bg-[${event.color}] text-white`
                    : `bg-white text-gray-700 border border-gray-200 hover:border-[${event.color}]`
                }`}
                style={{
                  backgroundColor: activeEvent === index ? event.color : "white",
                  borderColor: activeEvent !== index ? event.color : "transparent",
                }}
              >
                <span className="text-xs sm:text-sm">{event.year}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#00A7E1]/20 via-[#00A7E1] to-[#00A7E1]/20 hidden md:block rounded-full"></div>

          {/* Timeline events */}
          <div className="space-y-16 md:space-y-24 relative">
            {timelineEvents.map((event, index) => (
              <AnimateOnScroll
                key={index}
                variant={index % 2 === 0 ? "fade-right" : "fade-left"}
                duration={0.8}
                className="relative"
              >
                <div
                  className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}
                >
                  <div className="md:w-1/2 w-full">
                    <motion.div
                      className={`bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border-t-4 relative overflow-hidden group`}
                      style={{ borderColor: event.color }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gray-100 to-transparent opacity-50 rounded-bl-full"></div>

                      <div className="flex items-start gap-4">
                        <div
                          className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${event.color}20` }}
                        >
                          <div className="text-2xl font-bold" style={{ color: event.color }}>
                            {event.year}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold">{event.title}</h3>
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: event.color }}
                            >
                              {event.icon}
                            </div>
                          </div>

                          <p className="text-gray-600 mb-4">{event.description}</p>

                          <div
                            className="flex items-center gap-2 text-sm font-medium rounded-full px-3 py-1 w-fit"
                            style={{ backgroundColor: `${event.color}15`, color: event.color }}
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span>{event.achievement}</span>
                          </div>
                        </div>
                      </div>

                      <div
                        className="absolute bottom-0 left-0 w-full h-1 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left"
                        style={{ backgroundColor: event.color }}
                      ></div>
                    </motion.div>
                  </div>

                  {/* Image section */}
                  <div className="md:w-1/2 w-full">
                    <motion.div
                      className="relative h-48 sm:h-64 md:h-72 w-full rounded-xl overflow-hidden shadow-lg"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={`${event.title} - ${event.year}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <Badge className="mb-2" style={{ backgroundColor: event.color }}>
                          {event.year}
                        </Badge>
                        <h4 className="text-lg font-bold">{event.title}</h4>
                      </div>
                    </motion.div>
                  </div>

                  {/* Timeline dot - visible on desktop */}
                  <motion.div
                    className="hidden md:flex items-center justify-center w-14 h-14 rounded-full text-white font-bold absolute left-1/2 transform -translate-x-1/2 shadow-lg z-10"
                    style={{ backgroundColor: event.color }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                  >
                    {event.icon}
                  </motion.div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>

        <AnimateOnScroll variant="fade-up" duration={0.8}>
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-[#00A7E1]/10 to-[#0089b8]/10 p-6 rounded-xl border border-[#00A7E1]/20 shadow-sm max-w-3xl mx-auto">
              <h3 className="text-xl font-bold mb-3 text-gray-800">Nossa Missão Continua</h3>
              <p className="text-gray-600 md:text-lg mb-6">
                Hoje, a Triar Contabilidade é reconhecida pela excelência em serviços contábeis, atendendo mais de 500
                clientes em diversos segmentos. Continuamos comprometidos com a inovação e a qualidade, sempre buscando
                as melhores soluções para nossos clientes.
              </p>
              <Button
                className="bg-gradient-to-r from-[#00A7E1] to-[#0089b8] hover:from-[#0089b8] hover:to-[#007ba8] text-white shadow-md group"
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Faça Parte da Nossa História
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
