"use client"

import { motion } from "framer-motion"
import { Calculator, FileText, TrendingUp, Building, Users, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"
import { useState } from "react"

export default function ServicesList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const services = [
    {
      icon: <Calculator className="h-10 w-10 text-[#00A7E1]" />,
      title: "Contabilidade Empresarial",
      description:
        "Serviços contábeis completos para empresas de todos os portes e segmentos, incluindo classificação e registro de documentos, elaboração de demonstrações financeiras, análise de balanços e muito mais.",
      features: [
        "Classificação e registro de documentos",
        "Elaboração de demonstrações financeiras",
        "Análise de balanços",
        "Conciliações bancárias",
        "Apuração de resultados",
      ],
    },
    {
      icon: <FileText className="h-10 w-10 text-[#00A7E1]" />,
      title: "Departamento Fiscal",
      description:
        "Gestão fiscal estratégica para reduzir a carga tributária de forma legal, incluindo escrituração de livros fiscais, apuração de impostos, emissão de guias e declarações acessórias.",
      features: [
        "Escrituração de livros fiscais",
        "Apuração de impostos",
        "Emissão de guias",
        "Declarações acessórias",
        "Orientação fiscal",
      ],
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-[#00A7E1]" />,
      title: "Planejamento Tributário",
      description:
        "Estratégias para otimizar a carga tributária da sua empresa conforme a legislação, identificando oportunidades de economia fiscal e prevenindo riscos tributários.",
      features: [
        "Análise de enquadramento tributário",
        "Identificação de oportunidades de economia fiscal",
        "Prevenção de riscos tributários",
        "Recuperação de créditos tributários",
        "Consultoria tributária",
      ],
    },
    {
      icon: <Building className="h-10 w-10 text-[#00A7E1]" />,
      title: "Abertura de Empresas",
      description:
        "Assessoria completa para abertura, alteração e encerramento de empresas, incluindo registro na Junta Comercial, obtenção de CNPJ e alvarás.",
      features: [
        "Registro na Junta Comercial",
        "Obtenção de CNPJ",
        "Inscrições estaduais e municipais",
        "Obtenção de alvarás",
        "Alterações contratuais",
      ],
    },
    {
      icon: <Users className="h-10 w-10 text-[#00A7E1]" />,
      title: "Departamento Pessoal",
      description:
        "Gestão completa da folha de pagamento e rotinas trabalhistas, incluindo admissão e demissão de funcionários, cálculo de férias e 13º salário.",
      features: [
        "Admissão e demissão de funcionários",
        "Folha de pagamento",
        "Cálculo de férias e 13º salário",
        "Obrigações acessórias (CAGED, RAIS, DIRF)",
        "Homologações",
      ],
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-[#00A7E1]" />,
      title: "Consultoria Contábil",
      description:
        "Orientação especializada para tomada de decisões estratégicas no seu negócio, incluindo análise de viabilidade econômica e financeira e gestão de custos.",
      features: [
        "Análise de viabilidade econômica e financeira",
        "Gestão de custos",
        "Elaboração de relatórios gerenciais",
        "Assessoria para tomada de decisões",
        "Planejamento financeiro",
      ],
    },
  ]

  return (
    <section className="w-full py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <AnimateOnScroll variant="fade-up" duration={0.8}>
          <div className="flex flex-col items-center text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Conheça Nossos Serviços em Detalhes</h2>
              <p className="text-gray-500 md:text-xl max-w-[700px] mx-auto">
                Oferecemos soluções contábeis completas para atender às necessidades específicas do seu negócio.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <AnimateOnScroll key={index} variant="fade-up" delay={index * 100} duration={0.6}>
              <Card
                className={`border-none shadow-md transition-all duration-500 h-full ${
                  hoveredIndex === index
                    ? "shadow-xl transform -translate-y-2 bg-gradient-to-br from-white to-[#f0f9fd]"
                    : "hover:shadow-lg hover:-translate-y-1"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <CardHeader className="pb-2">
                  <motion.div
                    className={`mb-2 transition-transform duration-500`}
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
                  <CardTitle className="text-xl relative">
                    {service.title}
                    {hoveredIndex === index && (
                      <motion.span
                        className="absolute -bottom-1 left-0 h-0.5 bg-[#00A7E1]"
                        initial={{ width: 0 }}
                        animate={{ width: "3rem" }}
                        transition={{ duration: 0.3 }}
                      ></motion.span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-500 mb-4">{service.description}</CardDescription>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">O que incluímos:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <div className="h-5 w-5 flex-shrink-0 rounded-full bg-[#00A7E1]/10 flex items-center justify-center mt-0.5">
                            <div className="h-2 w-2 rounded-full bg-[#00A7E1]"></div>
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
