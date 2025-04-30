"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"
import { CheckCircle, Mail, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function BlogNewsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setIsError(true)
      setTimeout(() => setIsError(false), 3000)
      return
    }

    setIsLoading(true)

    // Simular chamada de API
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      setEmail("")

      // Reset após 5 segundos
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <AnimateOnScroll variant="fade-left" delay={600} duration={0.8}>
      <div className="bg-[#00A7E1] text-white rounded-xl p-6 shadow-md relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white/20 rounded-full p-2">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">Inscreva-se na Newsletter</h3>
          </div>

          <p className="text-white/80 mb-4">
            Receba as últimas novidades e artigos sobre contabilidade diretamente no seu email.
          </p>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 p-4 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <div>
                  <p className="font-medium">Obrigado por se inscrever!</p>
                  <p className="text-sm text-white/80">Você receberá nossas novidades em breve.</p>
                </div>
              </div>
            </motion.div>
          ) : isError ? (
            <Alert variant="destructive" className="bg-red-500/20 border-red-300/30 text-white">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>Por favor, insira um endereço de email válido.</AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-3">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 placeholder:text-white/60 text-white pr-12"
                  />
                  <Mail className="absolute right-3 top-2.5 h-5 w-5 text-white/40" />
                </div>

                <div className="flex gap-2">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex-1">
                    <Button
                      type="submit"
                      className="w-full bg-white text-[#00A7E1] hover:bg-white/90 transition-colors duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#00A7E1]"
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
                          Processando...
                        </>
                      ) : (
                        "Inscrever-se"
                      )}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </form>
          )}

          <div className="flex items-center gap-2 mt-4">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-xs text-white/60">Mais de 2.500 profissionais já estão inscritos</p>
          </div>

          <p className="text-xs text-white/60 mt-4">
            Ao se inscrever, você concorda com nossa política de privacidade. Não enviamos spam.
          </p>
        </div>
      </div>
    </AnimateOnScroll>
  )
}
