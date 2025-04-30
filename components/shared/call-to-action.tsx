"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"
import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Send, MessageSquare, CheckCircle, Loader2, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export default function CallToAction() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [isFocused, setIsFocused] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormState((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission with a delay
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Form submission logic would go here
      toast("Mensagem enviada com sucesso!",{
        description: "Entraremos em contato em breve.",
      })

      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        phone: "",
        message: "",
      })

      // Reset form after showing success state
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    } catch (error) {
      toast("Erro ao enviar mensagem",{
        description: "Por favor, tente novamente mais tarde.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsAppClick = () => {
    // Replace with your actual WhatsApp number
    const whatsappNumber = "5511999999999"
    const message = "Olá! Gostaria de saber mais sobre os serviços da Triar Contabilidade."
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section
      id="contact"
      className="w-full py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#00A7E1] to-[#0089b8] text-white relative"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-white opacity-5"></div>
        <motion.div
          className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
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
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
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

        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 7,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      <div className="container px-4 md:px-6 relative z-10 max-w-7xl mx-auto">
        <AnimateOnScroll variant="fade-up" duration={0.8}>
          <div className="text-center mb-12">
            <motion.div
              className="inline-block bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Fale Conosco
            </motion.div>
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Vamos conversar sobre o seu negócio
            </motion.h2>
            <motion.p
              className="max-w-[800px] mx-auto text-sm sm:text-base text-white/90 md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Entre em contato conosco para uma consultoria inicial gratuita e descubra como podemos ajudar o seu
              negócio a crescer com soluções contábeis personalizadas.
            </motion.p>
          </div>
        </AnimateOnScroll>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12 items-start max-w-6xl mx-auto">
          <AnimateOnScroll variant="fade-right" duration={0.8}>
            <div className="flex flex-col justify-center space-y-6">
              <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg border border-white/20">
                <h3 className="text-lg sm:text-xl font-bold mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <Badge className="bg-white text-[#00A7E1] hover:bg-white/90">Atendimento Rápido</Badge>
                  <span>Fale diretamente conosco</span>
                </h3>

                <motion.div className="mb-8" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-green-500 hover:bg-green-600 text-white h-14 text-lg font-medium shadow-lg group"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 justify-center">
                      <div className="bg-white/20 p-1.5 rounded-full">
                        <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <span className="text-base sm:text-lg">Conversar no WhatsApp</span>
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Button>
                </motion.div>

                <ul className="space-y-4 sm:space-y-5">
                  <li className="flex items-center gap-3 sm:gap-4 group hover:translate-x-1 transition-transform duration-300">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center shadow-inner">
                      <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-white/70">Telefone</p>
                      <span className="font-medium text-sm sm:text-base">(11) 9999-9999</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-3 sm:gap-4 group hover:translate-x-1 transition-transform duration-300">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center shadow-inner">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-white/70">Email</p>
                      <span className="font-medium text-sm sm:text-base break-all sm:break-normal">
                        contato@triarcontabilidade.com.br
                      </span>
                    </div>
                  </li>
                  <li className="flex items-center gap-3 sm:gap-4 group hover:translate-x-1 transition-transform duration-300">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center shadow-inner">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-white/70">Endereço</p>
                      <span className="font-medium text-sm sm:text-base">Av. Paulista, 1000 - São Paulo/SP</span>
                    </div>
                  </li>
                </ul>

                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10">
                  <p className="text-xs sm:text-sm text-white/80 mb-2 sm:mb-3">Horário de atendimento</p>
                  <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                    <div className="bg-white/5 p-2 sm:p-3 rounded-lg">
                      <p className="font-medium">Segunda a Sexta</p>
                      <p className="text-white/70">09:00 - 18:00</p>
                    </div>
                    <div className="bg-white/5 p-2 sm:p-3 rounded-lg">
                      <p className="font-medium">Sábado</p>
                      <p className="text-white/70">09:00 - 13:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-left" duration={0.8}>
            <motion.div
              className="bg-white p-5 sm:p-6 md:p-8 rounded-2xl shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            >
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Envie sua mensagem</h3>

              {isSubmitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-6 sm:py-10 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <CheckCircle className="h-7 w-7 sm:h-8 sm:w-8 text-green-600" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Mensagem Enviada!</h4>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                    Agradecemos seu contato. Retornaremos em breve.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                    className="border-[#00A7E1] text-[#00A7E1] hover:bg-[#00A7E1] hover:text-white text-sm sm:text-base"
                  >
                    Enviar nova mensagem
                  </Button>
                </motion.div>
              ) : (
                <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                        Nome <span className="text-red-500">*</span>
                      </label>
                      <div
                        className={`relative transition-all duration-300 ${isFocused === "name" ? "scale-[1.02]" : ""}`}
                      >
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Input
                            id="name"
                            placeholder="Seu nome completo"
                            className={`border-gray-300 transition-all duration-300 text-black ${
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
                      <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div
                        className={`relative transition-all duration-300 ${isFocused === "email" ? "scale-[1.02]" : ""}`}
                      >
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            className={`border-gray-300 transition-all duration-300 text-black ${
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
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                      Telefone <span className="text-red-500">*</span>
                    </label>
                    <div
                      className={`relative transition-all duration-300 ${isFocused === "phone" ? "scale-[1.02]" : ""}`}
                    >
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Input
                          id="phone"
                          placeholder="(00) 00000-0000"
                          className={`border-gray-300 transition-all duration-300 text-black ${
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
                    <label htmlFor="message" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                      Mensagem <span className="text-red-500">*</span>
                    </label>
                    <div
                      className={`relative transition-all duration-300 ${isFocused === "message" ? "scale-[1.02]" : ""}`}
                    >
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Textarea
                          id="message"
                          placeholder="Descreva como podemos ajudar você ou sua empresa..."
                          className={`min-h-[120px] sm:min-h-[150px] border-gray-300 transition-all duration-300 text-black ${
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

                  <div className="pt-2">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button
                        type="submit"
                        className="w-full bg-[#00A7E1] hover:bg-[#0089b8] text-white h-10 sm:h-12 text-sm sm:text-base font-medium relative overflow-hidden group disabled:opacity-70"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Enviando...</span>
                          </div>
                        ) : (
                          <>
                            <span className="relative z-10 flex items-center gap-2">
                              <Send className="h-4 w-4" />
                              Enviar Mensagem
                            </span>
                            <span className="absolute inset-0 bg-[#0089b8] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>

                  <p className="text-[10px] sm:text-xs text-gray-500 text-center mt-3 sm:mt-4">
                    Ao enviar este formulário, você concorda com nossa{" "}
                    <a href="#" className="text-[#00A7E1] hover:underline">
                      Política de Privacidade
                    </a>
                  </p>
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
