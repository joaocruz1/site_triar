"use client"

import { motion } from "framer-motion"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"

export default function ContactHero() {
  return (
    <section className="w-full py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#00A7E1]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00A7E1]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <AnimateOnScroll variant="fade-up" duration={0.8}>
            <div className="space-y-4">
              <div className="inline-block bg-[#00A7E1]/10 text-[#00A7E1] px-3 py-1 rounded-full text-sm font-medium mb-2">
                Contato
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Vamos <span className="text-[#00A7E1]">Conversar</span>
              </h1>
              <p className="text-gray-500 md:text-xl max-w-[700px] mx-auto">
                Entre em contato conosco para solicitar um orçamento, tirar dúvidas ou conhecer mais sobre nossos
                serviços. Estamos prontos para atendê-lo.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-up" delay={200} duration={0.8}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <motion.div
                className="bg-gray-50 p-6 rounded-lg text-center"
                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="mx-auto w-12 h-12 rounded-full bg-[#00A7E1]/10 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-[#00A7E1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Telefone</h3>
                <p className="text-gray-600">(11) 9999-9999</p>
              </motion.div>

              <motion.div
                className="bg-gray-50 p-6 rounded-lg text-center"
                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="mx-auto w-12 h-12 rounded-full bg-[#00A7E1]/10 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-[#00A7E1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Email</h3>
                <p className="text-gray-600">contato@triarcontabilidade.com.br</p>
              </motion.div>

              <motion.div
                className="bg-gray-50 p-6 rounded-lg text-center"
                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="mx-auto w-12 h-12 rounded-full bg-[#00A7E1]/10 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-[#00A7E1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Endereço</h3>
                <p className="text-gray-600">Av. Paulista, 1000 - São Paulo/SP</p>
              </motion.div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
