"use client"

import { useState, useEffect, useRef } from "react"
import { Quote, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"


export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const testimonialRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState("all")

  const testimonials = [
    {
      name: "Carlos Silva",
      company: "Tech Solutions Ltda",
      image: "/placeholder.svg?height=100&width=100",
      text: "A Triar Contabilidade transformou a gestão financeira da minha empresa. Profissionais extremamente competentes e atenciosos.",
      rating: 5,
      category: "tecnologia",
    },
    {
      name: "Ana Oliveira",
      company: "Boutique Elegance",
      image: "/placeholder.svg?height=100&width=100",
      text: "Desde que contratamos a Triar, tivemos uma redução significativa na carga tributária e mais tempo para focar no nosso negócio.",
      rating: 5,
      category: "varejo",
    },
    {
      name: "Roberto Mendes",
      company: "Construções Mendes",
      image: "/placeholder.svg?height=100&width=100",
      text: "Atendimento de excelência e soluções personalizadas para o nosso segmento. Recomendo fortemente a Triar Contabilidade.",
      rating: 4,
      category: "construcao",
    },
    {
      name: "Juliana Costa",
      company: "Restaurante Sabor & Arte",
      image: "/placeholder.svg?height=100&width=100",
      text: "Profissionais que realmente entendem as particularidades do nosso setor. Estamos muito satisfeitos com os serviços prestados.",
      rating: 5,
      category: "alimentacao",
    },
    {
      name: "Marcos Pereira",
      company: "Clínica Saúde Total",
      image: "/placeholder.svg?height=100&width=100",
      text: "A Triar nos ajudou a organizar toda a parte contábil da clínica, permitindo que focássemos no atendimento aos pacientes.",
      rating: 5,
      category: "saude",
    },
    {
      name: "Fernanda Lima",
      company: "Agência Digital Criativa",
      image: "/placeholder.svg?height=100&width=100",
      text: "Excelente suporte contábil para nossa agência. Sempre atentos às mudanças na legislação e com soluções inovadoras.",
      rating: 4,
      category: "tecnologia",
    },
  ]

  const filters = [
    { id: "all", label: "Todos" },
    { id: "tecnologia", label: "Tecnologia" },
    { id: "varejo", label: "Varejo" },
    { id: "saude", label: "Saúde" },
  ]

  const filteredTestimonials =
    activeFilter === "all" ? testimonials : testimonials.filter((t) => t.category === activeFilter)

  const totalTestimonials = filteredTestimonials.length

  const next = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((current + 1) % totalTestimonials)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((current - 1 + totalTestimonials) % totalTestimonials)
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    // Reset current index when filter changes
    setCurrent(0)
  }, [activeFilter])

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      next()
    }, 5000)

    return () => clearInterval(interval)
  }, [current, autoplay, totalTestimonials])

  // Pause autoplay when hovering over testimonials
  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

  // For mobile display, show different layout
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <section id="testimonials" className="w-full py-12 md:py-24 bg-white relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00A7E1]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#00A7E1]/5 rounded-full blur-3xl"></div>
      </div>



      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimateOnScroll variant="fade-up" duration={0.8}>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block bg-[#00A7E1]/10 text-[#00A7E1] px-3 py-1 rounded-full text-sm font-medium mb-2">
                Depoimentos
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                O Que Nossos Clientes Dizem
              </h2>
              <p className="max-w-[700px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A satisfação de nossos clientes é o nosso maior orgulho
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Filtros por categoria */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.id)}
              className={activeFilter === filter.id ? "bg-[#00A7E1] hover:bg-[#0089b8]" : ""}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {isMobile ? (
          // Mobile testimonial design
          <div className="mt-12 space-y-8">
            {filteredTestimonials.map((testimonial, index) => (
              <AnimateOnScroll key={index} variant="fade-up" delay={index * 100} duration={0.6}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-6 relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A7E1]/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                      <Quote className="h-8 w-8 text-[#00A7E1]/50 mb-2" />
                      <p className="text-base text-gray-700 italic">"{testimonial.text}"</p>

                      {/* Rating stars */}
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>

                      <div className="pt-4 flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#00A7E1]/20">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold">{testimonial.name}</h4>
                          <p className="text-sm text-gray-500">{testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        ) : (
          // Desktop carousel
          <div className="relative mt-12" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="overflow-hidden">
              <div
                ref={testimonialRef}
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {filteredTestimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <Card className="border-none shadow-xl overflow-hidden h-full">
                      <CardContent className="p-8 relative h-full">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-[#00A7E1]/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div className="flex flex-col h-full">
                          <div className="flex items-start gap-6 mb-6 relative z-10">
                            <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-[#00A7E1]/20 flex-shrink-0">
                              <Image
                                src={testimonial.image || "/placeholder.svg"}
                                alt={testimonial.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="text-xl font-bold">{testimonial.name}</h4>
                              <p className="text-[#00A7E1]">{testimonial.company}</p>
                              <div className="flex space-x-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex-grow flex flex-col justify-center relative z-10">
                            <Quote className="h-10 w-10 text-[#00A7E1]/30 mb-4" />
                            <p className="text-lg text-gray-700 italic leading-relaxed">"{testimonial.text}"</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation controls */}
            {filteredTestimonials.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-1/2 -left-4 transform -translate-y-1/2 rounded-full bg-white shadow-lg border-gray-200 hover:bg-[#00A7E1] hover:text-white"
                  onClick={prev}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-1/2 -right-4 transform -translate-y-1/2 rounded-full bg-white shadow-lg border-gray-200 hover:bg-[#00A7E1] hover:text-white"
                  onClick={next}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </>
            )}

            {/* Dots indicator */}
            {filteredTestimonials.length > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {filteredTestimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${
                      current === index ? "bg-[#00A7E1] w-6" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    onClick={() => {
                      setIsAnimating(true)
                      setCurrent(index)
                      setTimeout(() => setIsAnimating(false), 500)
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* CTA Section */}
        <AnimateOnScroll variant="fade-up" duration={0.8} delay={300}>
          <div className="mt-16 text-center">
            <Button
              className="bg-[#00A7E1] hover:bg-[#0089b8] text-white"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Seja Nosso Próximo Cliente Satisfeito
            </Button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
