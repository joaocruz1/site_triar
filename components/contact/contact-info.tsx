"use client"

import { motion } from "framer-motion"
import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"

export default function ContactInfo() {
  const contacts = [
    {
      icon: <Phone className="h-5 w-5 text-[#00A7E1]" />,
      title: "Telefone",
      text: "(11) 9999-9999",
    },
    {
      icon: <Mail className="h-5 w-5 text-[#00A7E1]" />,
      title: "Email",
      text: "contato@triarcontabilidade.com.br",
    },
    {
      icon: <MapPin className="h-5 w-5 text-[#00A7E1]" />,
      title: "Endereço",
      text: "Av. Paulista, 1000 - São Paulo/SP",
    },
    {
      icon: <Clock className="h-5 w-5 text-[#00A7E1]" />,
      title: "Horário de Atendimento",
      text: "Segunda a Sexta: 9h às 18h",
    },
  ]

  const socialLinks = [
    { name: "Facebook", icon: <Facebook className="h-5 w-5" />, href: "#" },
    { name: "Instagram", icon: <Instagram className="h-5 w-5" />, href: "#" },
    { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, href: "#" },
  ]

  return (
    <AnimateOnScroll variant="fade-left" duration={0.8}>
      <div className="bg-white p-8 rounded-xl shadow-lg h-full">
        <h2 className="text-2xl font-bold mb-6">Informações de Contato</h2>
        <div className="space-y-6">
          <div className="space-y-4">
            {contacts.map((contact, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 group"
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00A7E1]/10 flex items-center justify-center group-hover:bg-[#00A7E1]/20 transition-colors duration-300">
                  {contact.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{contact.title}</h3>
                  <p className="text-gray-600">{contact.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h3 className="font-medium text-gray-900 mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="w-10 h-10 rounded-full bg-[#00A7E1]/10 flex items-center justify-center text-[#00A7E1] hover:bg-[#00A7E1] hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                  <span className="sr-only">{link.name}</span>
                </motion.a>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h3 className="font-medium text-gray-900 mb-4">Solicite uma Visita</h3>
            <p className="text-gray-600 mb-4">
              Agende uma visita em nosso escritório para conhecer nossa equipe e discutir como podemos ajudar o seu
              negócio.
            </p>
            <motion.a
              href="tel:(11) 9999-9999"
              className="inline-flex items-center gap-2 text-[#00A7E1] font-medium hover:underline"
              whileHover={{ x: 5 }}
            >
              <Phone className="h-4 w-4" />
              Agendar Visita
            </motion.a>
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  )
}
