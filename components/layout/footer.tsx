"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import Logo from "./logo"
import AnimateOnScroll from "../shared/animate-on-scroll"
import { useState } from "react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)

  const socialLinks = [
    { name: "Facebook", icon: <Facebook className="h-5 w-5" />, href: "#" },
    { name: "Instagram", icon: <Instagram className="h-5 w-5" />, href: "#" },
    { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, href: "#" },
  ]

  const services = [
    { name: "Contabilidade Empresarial", href: "/servicos" },
    { name: "Departamento Fiscal", href: "/servicos" },
    { name: "Planejamento Tributário", href: "/servicos" },
    { name: "Abertura de Empresas", href: "/servicos" },
    { name: "Departamento Pessoal", href: "/servicos" },
  ]

  const links = [
    { name: "Início", href: "/" },
    { name: "Sobre Nós", href: "/sobre" },
    { name: "Serviços", href: "/servicos" },
    { name: "Blog", href: "/blog" },
    { name: "Contato", href: "/contato" },
  ]

  const contacts = [
    {
      icon: <Phone className="h-5 w-5 text-[#00A7E1]" />,
      text: "(11) 9999-9999",
    },
    {
      icon: <Mail className="h-5 w-5 text-[#00A7E1]" />,
      text: "contato@triarcontabilidade.com.br",
    },
    {
      icon: <MapPin className="h-5 w-5 text-[#00A7E1]" />,
      text: "Av. Paulista, 1000 - São Paulo/SP",
    },
  ]

  return (
    <footer className="w-full py-12 bg-gray-900 text-gray-100 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#00A7E1]/5 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <AnimateOnScroll variant="fade-right" duration={0.8}>
            <div className="space-y-4">
              <Logo />
              <p className="text-sm text-gray-400 max-w-xs">
                Soluções contábeis personalizadas para impulsionar o crescimento do seu negócio.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-gray-400 hover:text-[#00A7E1] transition-colors duration-300"
                    onMouseEnter={() => setHoveredIcon(link.name)}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    <div
                      className={`transform transition-transform duration-300 ${
                        hoveredIcon === link.name ? "scale-125" : ""
                      }`}
                    >
                      {link.icon}
                    </div>
                    <span className="sr-only">{link.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-up" delay={100} duration={0.8}>
            <div className="space-y-4">
              <h3 className="text-lg font-bold relative inline-block">
                Serviços
                <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#00A7E1]"></span>
              </h3>
              <ul className="space-y-2">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.href}
                      className="text-gray-400 hover:text-[#00A7E1] transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-up" delay={200} duration={0.8}>
            <div className="space-y-4">
              <h3 className="text-lg font-bold relative inline-block">
                Links Úteis
                <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#00A7E1]"></span>
              </h3>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-[#00A7E1] transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-left" delay={300} duration={0.8}>
            <div className="space-y-4">
              <h3 className="text-lg font-bold relative inline-block">
                Contato
                <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#00A7E1]"></span>
              </h3>
              <ul className="space-y-3">
                {contacts.map((contact, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 group hover:translate-x-1 transition-transform duration-300"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors duration-300">
                      {contact.icon}
                    </div>
                    <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {contact.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateOnScroll>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Triar Contabilidade. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
