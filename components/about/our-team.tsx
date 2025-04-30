"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Facebook, Linkedin, Mail } from "lucide-react"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"

export default function OurTeam() {
  const teamMembers = [
    {
      name: "Carlos Oliveira",
      position: "Contador Sênior / CEO",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Contador com mais de 15 anos de experiência, especialista em planejamento tributário.",
      social: {
        linkedin: "#",
        email: "carlos@triarcontabilidade.com.br",
        facebook: "#",
      },
    },
    {
      name: "Ana Silva",
      position: "Diretora Financeira",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Especialista em gestão financeira com vasta experiência em consultoria para empresas.",
      social: {
        linkedin: "#",
        email: "ana@triarcontabilidade.com.br",
        facebook: "#",
      },
    },
    {
      name: "Roberto Santos",
      position: "Especialista Fiscal",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Profissional com amplo conhecimento em legislação tributária e planejamento fiscal.",
      social: {
        linkedin: "#",
        email: "roberto@triarcontabilidade.com.br",
        facebook: "#",
      },
    },
    {
      name: "Juliana Costa",
      position: "Gerente de RH",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Especialista em departamento pessoal e gestão de recursos humanos.",
      social: {
        linkedin: "#",
        email: "juliana@triarcontabilidade.com.br",
        facebook: "#",
      },
    },
  ]

  return (
    <section className="w-full py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <AnimateOnScroll variant="fade-up" duration={0.8}>
          <div className="flex flex-col items-center text-center mb-12">
            <div className="space-y-2">
              <div className="inline-block bg-[#00A7E1]/10 text-[#00A7E1] px-3 py-1 rounded-full text-sm font-medium mb-2">
                Nossa Equipe
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Conheça os Profissionais da Triar</h2>
              <p className="text-gray-500 md:text-xl max-w-[700px] mx-auto">
                Nossa equipe é formada por profissionais qualificados e comprometidos com a excelência.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <AnimateOnScroll key={index} variant="fade-up" delay={index * 100} duration={0.6}>
              <motion.div
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="relative h-64 w-full">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-[#00A7E1] font-medium mb-2">{member.position}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="flex space-x-3">
                    <a
                      href={member.social.linkedin}
                      className="text-gray-400 hover:text-[#00A7E1] transition-colors duration-300"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href={`mailto:${member.social.email}`}
                      className="text-gray-400 hover:text-[#00A7E1] transition-colors duration-300"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                    <a
                      href={member.social.facebook}
                      className="text-gray-400 hover:text-[#00A7E1] transition-colors duration-300"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll variant="fade-up" duration={0.8}>
          <div className="mt-16 text-center">
            <p className="text-gray-500 md:text-lg max-w-[800px] mx-auto">
              Nossa equipe está em constante atualização para oferecer as melhores soluções contábeis para o seu
              negócio. Contamos com profissionais especializados em diversos segmentos do mercado.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
