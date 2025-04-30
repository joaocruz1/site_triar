"use client"

import { Calculator, FileText, TrendingUp, Building, Users, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"
import { useState } from "react"
import { motion } from "framer-motion"
import ThreeDCard from "@/components/shared/3d-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const services = [
    {
      icon: <Calculator className="h-10 w-10 text-[#00A7E1]" />,
      title: "Contabilidade Empresarial",
      description: "Serviços contábeis completos para empresas de todos os portes e segmentos.",
      features: ["Demonstrações financeiras", "Análise de balanços", "Conciliações bancárias"],
      link: "/servicos#contabilidade",
    },
    {
      icon: <FileText className="h-10 w-10 text-[#00A7E1]" />,
      title: "Departamento Fiscal",
      description: "Gestão fiscal estratégica para reduzir a carga tributária de forma legal.",
      features: ["Escrituração fiscal", "Apuração de impostos", "Declarações acessórias"],
      link: "/servicos#fiscal",
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-[#00A7E1]" />,
      title: "Planejamento Tributário",
      description: "Estratégias para otimizar a carga tributária da sua empresa conforme a legislação.",
      features: ["Análise de enquadramento", "Recuperação de créditos", "Prevenção de riscos"],
      link: "/servicos#tributario",
    },
    {
      icon: <Building className="h-10 w-10 text-[#00A7E1]" />,
      title: "Abertura de Empresas",
      description: "Assessoria completa para abertura, alteração e encerramento de empresas.",
      features: ["Registro na Junta Comercial", "Obtenção de CNPJ", "Alvarás e licenças"],
      link: "/servicos#abertura",
    },
    {
      icon: <Users className="h-10 w-10 text-[#00A7E1]" />,
      title: "Departamento Pessoal",
      description: "Gestão completa da folha de pagamento e rotinas trabalhistas.",
      features: ["Folha de pagamento", "Férias e 13º", "eSocial e obrigações"],
      link: "/servicos#pessoal",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-[#00A7E1]" />,
      title: "Consultoria Contábil",
      description: "Orientação especializada para tomada de decisões estratégicas no seu negócio.",
      features: ["Análise de viabilidade", "Gestão de custos", "Relatórios gerenciais"],
      link: "/servicos#consultoria",
    },
  ]

  return (
    <section id="services" className="w-full py-12 md:py-24 bg-gray-50 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A7E1]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00A7E1]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimateOnScroll variant="fade-up" duration={0.8}>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block bg-[#00A7E1]/10 text-[#00A7E1] px-3 py-1 rounded-full text-sm font-medium mb-2">
                Nossos Serviços
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Soluções Contábeis Completas
              </h2>
              <p className="max-w-[700px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Oferecemos soluções contábeis completas para o seu negócio com tecnologia de ponta
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((service, index) => (
            <AnimateOnScroll key={index} variant="fade-up" delay={index * 100} duration={0.6}>
              <ThreeDCard className="h-full">
                <Card
                  className={`border-none shadow-md transition-all duration-500 h-full ${
                    hoveredIndex === index
                      ? "shadow-xl transform -translate-y-2 bg-gradient-to-br from-white to-[#f0f9fd]"
                      : "hover:shadow-lg hover:-translate-y-1"
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <CardHeader className="pb-2 text-center">
                    <motion.div
                      className={`mb-2 mx-auto transition-transform duration-500`}
                      animate={{
                        scale: hoveredIndex === index ? 1.1 : 1,
                        rotate: hoveredIndex === index ? [0, 5, 0, -5, 0] : 0,
                      }}
                      transition={{
                        duration: 0.5,
                        rotate: {
                          duration: 0.5,
                          repeat: 0,
                        },
                      }}
                    >
                      {service.icon}
                    </motion.div>
                    <CardTitle className="text-xl relative text-center">
                      {service.title}
                      {hoveredIndex === index && (
                        <motion.span
                          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-[#00A7E1]"
                          initial={{ width: 0 }}
                          animate={{ width: "3rem" }}
                          transition={{ duration: 0.3 }}
                        ></motion.span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full">
                    <CardDescription className="text-base text-gray-500 text-center mb-4">
                      {service.description}
                    </CardDescription>

                    {/* Features list */}
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="h-1.5 w-1.5 rounded-full bg-[#00A7E1] mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Botão de saiba mais */}
                    <div className="mt-auto pt-4">
                      <Link href={service.link}>
                        <Button
                          variant="outline"
                          className="w-full border-[#00A7E1] text-[#00A7E1] hover:bg-[#00A7E1] hover:text-white transition-colors"
                        >
                          Saiba mais
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </ThreeDCard>
            </AnimateOnScroll>
          ))}
        </div>

        {/* CTA para serviços personalizados */}
        <AnimateOnScroll variant="fade-up" duration={0.8} delay={300}>
          <div className="mt-16 text-center">
            <div className="inline-block bg-[#00A7E1]/5 rounded-xl p-6 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-3">Precisa de uma solução personalizada?</h3>
              <p className="text-gray-600 mb-4">
                Nossa equipe de especialistas está pronta para desenvolver uma solução sob medida para o seu negócio.
              </p>
              <Button
                className="bg-[#00A7E1] hover:bg-[#0089b8] text-white"
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Fale com um especialista
              </Button>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
