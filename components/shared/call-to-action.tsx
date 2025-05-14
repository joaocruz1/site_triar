"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MessageSquare, Send, Phone, Mail, MapPin, ArrowRight } from "lucide-react"

export default function CallToAction() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isMounted, setIsMounted] = useState(false)
  const [isFocused, setIsFocused] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormState((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormState({
          name: "",
          email: "",
          phone: "",
          message: "",
        })
      }, 3000)
    }, 1500)
  }

  const openWhatsApp = () => {
    // Replace with your actual WhatsApp number
    const phoneNumber = "5511999999999"
    const message = "Olá! Gostaria de saber mais sobre os serviços da Triar Contabilidade."
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <section
      id="contact"
      className="w-full py-12 md:py-16 lg:py-24 bg-gradient-to-br from-[#00A7E1] to-[#0077B6] text-white relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-white opacity-5"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        {/* Animated particles - only render on client side */}
        {isMounted && (
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 7}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              ></div>
            ))}
          </div>
        )}
      </div>

      <div className="container px-4 md:px-6 max-w-full md:max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-3"
          >
            Fale Conosco
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Vamos impulsionar seu negócio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-white/90 text-base sm:text-lg md:text-xl"
          >
            Entre em contato para uma consultoria personalizada e descubra como podemos ajudar sua empresa a crescer com
            soluções contábeis inteligentes.
          </motion.p>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
          <AnimateOnScroll variant="fade-right" duration={0.8}>
            <div className="flex flex-col justify-center space-y-4 sm:space-y-6 bg-white/10 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl">
              <div className="space-y-6">
                <div className="flex items-center gap-3 sm:gap-4 group hover:translate-x-2 transition-transform duration-300">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Telefone</p>
                    <span className="font-medium text-lg">(11) 9999-9999</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 group hover:translate-x-2 transition-transform duration-300">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Email</p>
                    <span className="font-medium text-lg break-all sm:break-normal">
                      contato@triarcontabilidade.com.br
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 group hover:translate-x-2 transition-transform duration-300">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Endereço</p>
                    <span className="font-medium text-lg">Av. Paulista, 1000 - São Paulo/SP</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/20">
                <motion.button
                  onClick={openWhatsApp}
                  className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Conversar no WhatsApp</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </motion.button>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-left" duration={0.8}>
            <motion.div
              className="bg-white/95 p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full py-8 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Mensagem Enviada!</h3>
                  <p className="text-gray-600">Agradecemos seu contato. Retornaremos em breve.</p>
                </motion.div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Envie uma mensagem</h3>

                  <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Nome
                      </label>
                      <div
                        className={`relative transition-all duration-300 ${isFocused === "name" ? "scale-[1.02]" : ""}`}
                      >
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Input
                            id="name"
                            placeholder="Seu nome completo"
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
                      <div
                        className={`relative transition-all duration-300 ${isFocused === "email" ? "scale-[1.02]" : ""}`}
                      >
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
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Telefone
                    </label>
                    <div
                      className={`relative transition-all duration-300 ${isFocused === "phone" ? "scale-[1.02]" : ""}`}
                    >
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
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">
                      Mensagem
                    </label>
                    <div
                      className={`relative transition-all duration-300 ${isFocused === "message" ? "scale-[1.02]" : ""}`}
                    >
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Textarea
                          id="message"
                          placeholder="Como podemos ajudar sua empresa?"
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
                      className="w-full py-4 sm:py-6 bg-[#00A7E1] hover:bg-[#0089b8] text-white relative overflow-hidden group"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Enviando...
                        </div>
                      ) : (
                        <>
                          <span className="relative z-10 flex items-center">
                            <Send className="h-4 w-4 mr-2" />
                            Enviar Mensagem
                          </span>
                          <span className="absolute inset-0 bg-[#0089b8] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              )}
            </motion.div>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg className="w-full h-auto" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="white"
          ></path>
        </svg>
      </div>
    </section>
  )
}
