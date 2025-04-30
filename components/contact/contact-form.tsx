"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  })

  const [isFocused, setIsFocused] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormState((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.")
    setFormState({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
    })
  }

  return (
    <AnimateOnScroll variant="fade-right" duration={0.8}>
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Envie uma Mensagem</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Nome Completo
              </label>
              <div className={`relative transition-all duration-300 ${isFocused === "name" ? "scale-[1.02]" : ""}`}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    className={`border-gray-300 transition-all duration-300 ${
                      isFocused === "name" ? "border-[#00A7E1] ring-1 ring-[#00A7E1]/20" : ""
                    }`}
                    value={formState.name}
                    onChange={handleInputChange}
                    onFocus={() => setIsFocused("name")}
                    onBlur={() => setIsFocused(null)}
                    required
                  />
                </motion.div>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <div className={`relative transition-all duration-300 ${isFocused === "email" ? "scale-[1.02]" : ""}`}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className={`border-gray-300 transition-all duration-300 ${
                      isFocused === "email" ? "border-[#00A7E1] ring-1 ring-[#00A7E1]/20" : ""
                    }`}
                    value={formState.email}
                    onChange={handleInputChange}
                    onFocus={() => setIsFocused("email")}
                    onBlur={() => setIsFocused(null)}
                    required
                  />
                </motion.div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Telefone
              </label>
              <div className={`relative transition-all duration-300 ${isFocused === "phone" ? "scale-[1.02]" : ""}`}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Input
                    id="phone"
                    placeholder="(00) 00000-0000"
                    className={`border-gray-300 transition-all duration-300 ${
                      isFocused === "phone" ? "border-[#00A7E1] ring-1 ring-[#00A7E1]/20" : ""
                    }`}
                    value={formState.phone}
                    onChange={handleInputChange}
                    onFocus={() => setIsFocused("phone")}
                    onBlur={() => setIsFocused(null)}
                    required
                  />
                </motion.div>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium text-gray-700">
                Empresa
              </label>
              <div className={`relative transition-all duration-300 ${isFocused === "company" ? "scale-[1.02]" : ""}`}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Input
                    id="company"
                    placeholder="Nome da sua empresa"
                    className={`border-gray-300 transition-all duration-300 ${
                      isFocused === "company" ? "border-[#00A7E1] ring-1 ring-[#00A7E1]/20" : ""
                    }`}
                    value={formState.company}
                    onChange={handleInputChange}
                    onFocus={() => setIsFocused("company")}
                    onBlur={() => setIsFocused(null)}
                  />
                </motion.div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="service" className="text-sm font-medium text-gray-700">
              Serviço de Interesse
            </label>
            <div className={`relative transition-all duration-300 ${isFocused === "service" ? "scale-[1.02]" : ""}`}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <select
                  id="service"
                  className={`w-full rounded-md border-gray-300 transition-all duration-300 ${
                    isFocused === "service" ? "border-[#00A7E1] ring-1 ring-[#00A7E1]/20" : ""
                  }`}
                  value={formState.service}
                  onChange={handleInputChange}
                  onFocus={() => setIsFocused("service")}
                  onBlur={() => setIsFocused(null)}
                  required
                >
                  <option value="">Selecione um serviço</option>
                  <option value="contabilidade">Contabilidade Empresarial</option>
                  <option value="fiscal">Departamento Fiscal</option>
                  <option value="tributario">Planejamento Tributário</option>
                  <option value="abertura">Abertura de Empresas</option>
                  <option value="pessoal">Departamento Pessoal</option>
                  <option value="consultoria">Consultoria Contábil</option>
                </select>
              </motion.div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-gray-700">
              Mensagem
            </label>
            <div className={`relative transition-all duration-300 ${isFocused === "message" ? "scale-[1.02]" : ""}`}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Textarea
                  id="message"
                  placeholder="Como podemos ajudar?"
                  className={`min-h-[120px] border-gray-300 transition-all duration-300 ${
                    isFocused === "message" ? "border-[#00A7E1] ring-1 ring-[#00A7E1]/20" : ""
                  }`}
                  value={formState.message}
                  onChange={handleInputChange}
                  onFocus={() => setIsFocused("message")}
                  onBlur={() => setIsFocused(null)}
                  required
                />
              </motion.div>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              type="submit"
              className="w-full bg-[#00A7E1] hover:bg-[#0089b8] text-white relative overflow-hidden group"
            >
              <span className="relative z-10">Enviar Mensagem</span>
              <span className="absolute inset-0 bg-[#0089b8] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Button>
          </motion.div>
        </form>
      </div>
    </AnimateOnScroll>
  )
}
