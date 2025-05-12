"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, BarChart2, CheckCircle, Shield } from 'lucide-react'
import { TypeAnimation } from "react-type-animation"
import { useMediaQuery } from "@/hooks/use-media-query"

type CountUpType = {
  end: number
  duration: number
  suffix: string
}

export default function Hero() {
  const [activeTab, setActiveTab] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const benefitTabs = [
    {
      title: "Economia Fiscal",
      icon: <BarChart2 className="h-4 w-4 sm:h-5 sm:w-5" />,
      description: "Reduza até 32% em impostos com nosso planejamento tributário estratégico",
      color: "#00A7E1",
    },
    {
      title: "Segurança Contábil",
      icon: <Shield className="h-4 w-4 sm:h-5 sm:w-5" />,
      description: "Documentação 100% em conformidade com a legislação vigente",
      color: "#4CAF50",
    },
    {
      title: "Atendimento Premium",
      icon: <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />,
      description: "Suporte dedicado com resposta em até 4 horas úteis",
      color: "#FF9800",
    },
  ]

  useEffect(() => {
    setIsClient(true)

    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % benefitTabs.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  if (!isClient) {
    return null
  }

  // Mobile version - completely different approach
  if (isMobile) {
    return (
      <section className="w-full pt-20 pb-10 bg-gradient-to-b from-white to-gray-50">
        <div className="container px-4 mx-auto">
          {/* Mobile Header */}
          <div className="text-center mb-6">
            <div className="inline-block bg-[#00A7E1]/10 text-[#00A7E1] px-3 py-1 rounded-full text-xs font-medium mb-3">
              Contabilidade Digital
            </div>
            
            <h1 className="text-2xl font-bold mb-2">
              Soluções contábeis para o seu{" "}
              <span className="text-[#00A7E1]">
                <TypeAnimation
                  sequence={[
                    "negócio crescer",
                    2000,
                    "MEI prosperar",
                    2000,
                    "e-commerce expandir",
                    2000,
                    "futuro garantir",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Number.POSITIVE_INFINITY}
                />
              </span>
            </h1>
            
            <p className="text-xs text-gray-500 mb-4 px-2">
              Oferecemos serviços contábeis personalizados com tecnologia de ponta para empresas de todos os portes,
              com foco em eficiência e resultados mensuráveis.
            </p>
          </div>

          {/* Mobile Image - Single clean image */}
          <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden shadow-md">
            <Image
              src="/img/home/gestao.jpg"
              alt="Contabilidade Digital"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00A7E1]/30 to-transparent"></div>
            
            {/* Simple badge overlay */}
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm text-xs font-medium">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span>Tecnologia Avançada</span>
              </div>
            </div>
          </div>

          {/* Mobile CTA Buttons */}
          <div className="flex flex-col gap-2 mb-6">
            <Button
              className="bg-[#00A7E1] hover:bg-[#0089b8] text-white w-full"
              onClick={() => {
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }}
              size="sm"
            >
              <span className="flex items-center">
                Solicitar Orçamento
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Button>
            
            <Button
              variant="outline"
              className="border-[#00A7E1] text-[#00A7E1] hover:bg-[#e6f7fd] w-full"
              onClick={() => {
                document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })
              }}
              size="sm"
            >
              Conheça Nossos Serviços
            </Button>
          </div>

          {/* Mobile Benefits Tabs - Simplified */}
          <div className="bg-white rounded-lg p-4 shadow-md mb-6">
            <h3 className="text-sm font-medium mb-3 text-gray-800">Nossos diferenciais</h3>
            
            <div className="space-y-4">
              {benefitTabs.map((tab, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-md ${activeTab === index ? 'bg-[#00A7E1]/10' : 'bg-gray-50'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${tab.color}20` }}
                    >
                      <span style={{ color: tab.color }}>{tab.icon}</span>
                    </div>
                    <h4 className="text-sm font-medium" style={{ color: tab.color }}>
                      {tab.title}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-600 pl-8">{tab.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Social Proof - Simplified */}
          <div className="flex items-center justify-center gap-3 bg-white/80 rounded-lg p-3 shadow-sm">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-white overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=40&width=40&text=${i}`}
                    alt={`Cliente ${i}`}
                    width={28}
                    height={28}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-medium">+500 clientes satisfeitos</p>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-3 h-3 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-xs text-gray-500">4.9/5</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Desktop version - original design
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-visible">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00A7E1" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 bg-[#00A7E1]/5 rounded-full blur-3xl"
            animate={{
              x: [0, 10, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 -left-20 w-72 h-72 bg-[#00A7E1]/10 rounded-full blur-3xl"
            animate={{
              x: [0, -10, 0],
              y: [0, 10, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
          {/* Content Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-6 text-center lg:text-left">
            <motion.div
              className="inline-block bg-[#00A7E1]/10 text-[#00A7E1] px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-2 mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Contabilidade Digital
            </motion.div>

            <motion.h1
              className="text-3xl font-bold tracking-tighter md:text-4xl xl:text-5xl/none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="block">Soluções contábeis para o seu</span>
              <span className="text-[#00A7E1] relative inline-block">
                <TypeAnimation
                  sequence={[
                    "negócio crescer",
                    2000,
                    "MEI prosperar",
                    2000,
                    "e-commerce expandir",
                    2000,
                    "futuro garantir",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Number.POSITIVE_INFINITY}
                  className="text-3xl md:text-4xl xl:text-5xl"
                />
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
                >
                  <path
                    d="M1 5.5C47.6667 1.5 154.4 -1.9 199 5.5"
                    stroke="#00A7E1"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>
            </motion.h1>

            <motion.p
              className="text-sm max-w-[600px] text-gray-500 md:text-base mt-2 mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Oferecemos serviços contábeis personalizados com tecnologia de ponta para empresas de todos os portes, com
              foco em eficiência e resultados mensuráveis.
            </motion.p>

            <motion.div
              className="flex flex-row gap-4 justify-center lg:justify-start mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className="bg-[#00A7E1] hover:bg-[#0089b8] text-white relative overflow-hidden group"
                  onClick={() => {
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <span className="relative z-10 flex items-center">
                    Solicitar Orçamento
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-[#0089b8] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="border-[#00A7E1] text-[#00A7E1] hover:bg-[#e6f7fd] group"
                  onClick={() => {
                    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                    Conheça Nossos Serviços
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Benefit tabs */}
            <motion.div
              className="mt-4 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="flex space-x-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
                {benefitTabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all min-w-fit`}
                    style={{
                      backgroundColor: activeTab === index ? `${tab.color}10` : "",
                      color: activeTab === index ? tab.color : "rgb(107, 114, 128)",
                    }}
                  >
                    <span className="mr-1.5">{tab.icon}</span>
                    {tab.title}
                  </button>
                ))}
              </div>

              <div className="min-h-[60px] text-sm px-1">
                {benefitTabs.map((tab, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: activeTab === index ? 1 : 0,
                      y: activeTab === index ? 0 : 10,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`${activeTab === index ? "block" : "hidden"}`}
                  >
                    <p className="text-gray-700">{tab.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social proof */}
            <motion.div
              className="flex items-center justify-center lg:justify-start gap-3 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=40&width=40&text=${i}`}
                      alt={`Cliente ${i}`}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <p className="font-medium">+500 clientes satisfeitos</p>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-3 h-3 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-gray-500 text-xs">4.9/5</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Image Column */}
          <div className="lg:col-span-5 mt-6 lg:mt-0">
            <motion.div
              className="relative mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="relative h-[340px] lg:h-[420px]">
                {/* Main image with hexagon clip path */}
                <motion.div
                  className="absolute top-0 right-0 w-[80%] h-[80%] overflow-hidden shadow-xl"
                  style={{
                    clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 75% 100%, 0% 50%)",
                    borderRadius: "0.5rem",
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  <div className="w-full h-full relative">
                    <Image
                      src="/img/home/gestao.jpg"
                      alt="Equipe Triar Contabilidade"
                      fill
                      className="object-cover object-center"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#00A7E1]/30 to-transparent"></div>
                  </div>
                </motion.div>

                {/* Secondary image - circular */}
                <motion.div
                  className="absolute bottom-0 left-0 w-[45%] h-[45%] rounded-full overflow-hidden border-4 border-white shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  <Image
                    src="/img/home/equipe.png"
                    alt="Análise Contábil"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 40vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#00A7E1]/20"></div>
                </motion.div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute top-[40%] left-[35%] w-[20%] h-[20%] bg-white rounded-lg shadow-lg flex items-center justify-center p-2 z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                  whileHover={{ y: -3, boxShadow: "0 10px 15px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="text-center">
                    <div className="text-[#00A7E1] font-bold text-lg">32%</div>
                    <div className="text-xs text-gray-500">Economia</div>
                  </div>
                </motion.div>

                {/* Floating technology badge */}
                <motion.div
                  className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-md z-20"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3, type: "spring" }}
                >
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium">Tecnologia Avançada</span>
                  </div>
                </motion.div>

                {/* Floating card with stats */}
                <motion.div
                  className="absolute -bottom-3 right-4 bg-white rounded-lg shadow-md p-2 z-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  whileHover={{ y: -3, boxShadow: "0 10px 15px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#00A7E1]/20 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-[#00A7E1]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Clientes atendidos</p>
                      <p className="font-bold text-sm text-[#00A7E1]">
                        <CountUp end={500} duration={2} suffix="+" />
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Modern wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg className="w-full h-auto" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="#f9fafb"
            ></path>
          </svg>
        </div>
      </div>
    </section>
  )
}

function CountUp({ end, duration = 2, suffix = "" }: CountUpType) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount)
      }
    }

    animationFrame = requestAnimationFrame(updateCount)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}
