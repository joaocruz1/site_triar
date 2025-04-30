"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RegimeTributarioComparador from "@/components/interactive/regime-tributario-comparador"
import QuizContabil from "@/components/interactive/quiz-contabil"
import CalendarioFiscal from "@/components/interactive/calendario-fiscal"
import { Calculator, HelpCircle, CalendarIcon, ChevronRight } from "lucide-react"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"
import { motion } from "framer-motion"

export default function InteractiveSections() {
  const [activeTab, setActiveTab] = useState("comparador")

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-[#00A7E1]/5 rounded-full blur-3xl"
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
          className="absolute bottom-0 left-0 w-96 h-96 bg-[#00A7E1]/5 rounded-full blur-3xl"
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

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-[#00A7E1]/10 rounded-lg rotate-12 opacity-30" />
        <div className="absolute bottom-40 right-20 w-16 h-16 border-2 border-[#00A7E1]/10 rounded-full opacity-20" />
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-[#00A7E1]/5 rounded-md rotate-45" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <AnimateOnScroll variant="fade-up" duration={0.8}>
          <div className="flex flex-col items-center text-center mb-12">
            <div className="space-y-3">
              <motion.div
                className="inline-block bg-[#00A7E1]/10 text-[#00A7E1] px-4 py-1.5 rounded-full text-sm font-medium mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Ferramentas Interativas
              </motion.div>
              <motion.h2
                className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Recursos para Auxiliar sua Gestão Contábil
              </motion.h2>
              <motion.p
                className="text-gray-500 md:text-xl max-w-[800px] mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Utilize nossas ferramentas interativas para simular cenários, testar conhecimentos e acompanhar
                obrigações fiscais
              </motion.p>
            </div>
          </div>
        </AnimateOnScroll>

        <Tabs defaultValue="comparador" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList className="grid grid-cols-1 md:grid-cols-3 w-full max-w-2xl bg-gray-100/80 backdrop-blur-sm p-1 rounded-xl">
              <TabsTrigger
                value="comparador"
                className={`flex items-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 ${
                  activeTab === "comparador"
                    ? "bg-white text-[#00A7E1] shadow-md"
                    : "text-gray-600 hover:text-[#00A7E1]"
                }`}
              >
                <Calculator className={`h-4 w-4 ${activeTab === "comparador" ? "text-[#00A7E1]" : "text-gray-500"}`} />
                <span className="hidden sm:inline">Comparador Tributário</span>
                <span className="sm:hidden">Comparador</span>
              </TabsTrigger>
              <TabsTrigger
                value="quiz"
                className={`flex items-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 ${
                  activeTab === "quiz" ? "bg-white text-[#00A7E1] shadow-md" : "text-gray-600 hover:text-[#00A7E1]"
                }`}
              >
                <HelpCircle className={`h-4 w-4 ${activeTab === "quiz" ? "text-[#00A7E1]" : "text-gray-500"}`} />
                <span className="hidden sm:inline">Quiz Contábil</span>
                <span className="sm:hidden">Quiz</span>
              </TabsTrigger>
              <TabsTrigger
                value="calendario"
                className={`flex items-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 ${
                  activeTab === "calendario"
                    ? "bg-white text-[#00A7E1] shadow-md"
                    : "text-gray-600 hover:text-[#00A7E1]"
                }`}
              >
                <CalendarIcon
                  className={`h-4 w-4 ${activeTab === "calendario" ? "text-[#00A7E1]" : "text-gray-500"}`}
                />
                <span className="hidden sm:inline">Calendário Fiscal</span>
                <span className="sm:hidden">Calendário</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="comparador">
            <RegimeTributarioComparador />
          </TabsContent>

          <TabsContent value="quiz">
            <QuizContabil />
          </TabsContent>

          <TabsContent value="calendario">
            <CalendarioFiscal />
          </TabsContent>
        </Tabs>

        {/* Bottom decorative element */}
        <div className="flex justify-center mt-16">
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-gray-100">
            <span>Precisa de ajuda personalizada?</span>
            <a
              href="#contact"
              className="text-[#00A7E1] font-medium flex items-center hover:underline"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Fale com um especialista <ChevronRight className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
