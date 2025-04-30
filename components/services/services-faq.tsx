"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"
import { motion } from "framer-motion"
import { HelpCircle, Search, MessageCircle, ChevronRight, CheckCircle, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ServicesFAQ() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", name: "Todos" },
    { id: "documents", name: "Documentação" },
    { id: "taxes", name: "Impostos" },
    { id: "services", name: "Serviços" },
    { id: "company", name: "Empresa" },
  ]

  const faqs = [
    {
      question: "Quais são os documentos necessários para iniciar a contabilidade da minha empresa?",
      answer:
        "Para iniciar a contabilidade da sua empresa, são necessários documentos como contrato social, CNPJ, inscrições estadual e municipal, alvará de funcionamento, documentos dos sócios, extratos bancários, notas fiscais de compra e venda, entre outros. Nossa equipe irá orientá-lo sobre todos os documentos específicos para o seu caso.",
      category: "documents",
      popular: true,
    },
    {
      question: "Qual é o prazo para entrega das obrigações fiscais?",
      answer:
        "Os prazos para entrega das obrigações fiscais variam de acordo com o regime tributário da empresa e o tipo de obrigação. Por exemplo, a entrega da DCTF é mensal, enquanto a ECD é anual. Nossa equipe acompanha todos os prazos e garante que as obrigações sejam entregues dentro do prazo para evitar multas e penalidades.",
      category: "taxes",
      popular: true,
    },
    {
      question: "Como funciona o processo de abertura de empresa?",
      answer:
        "O processo de abertura de empresa envolve várias etapas, como consulta de viabilidade, registro na Junta Comercial, obtenção do CNPJ, inscrições estadual e municipal, alvará de funcionamento, entre outros. Nossa equipe cuida de todo o processo, desde a elaboração do contrato social até a obtenção de todas as licenças necessárias para o funcionamento da sua empresa.",
      category: "company",
      popular: false,
    },
    {
      question: "Qual é o melhor regime tributário para a minha empresa?",
      answer:
        "O melhor regime tributário depende de diversos fatores, como faturamento, atividade, margem de lucro, entre outros. Realizamos uma análise detalhada do seu negócio para identificar o regime tributário mais vantajoso, seja Simples Nacional, Lucro Presumido ou Lucro Real. Nossa equipe de especialistas irá orientá-lo sobre a melhor opção para o seu caso específico.",
      category: "taxes",
      popular: true,
    },
    {
      question: "Como posso reduzir a carga tributária da minha empresa de forma legal?",
      answer:
        "A redução da carga tributária de forma legal pode ser alcançada através de um planejamento tributário eficiente, que envolve a escolha do regime tributário adequado, aproveitamento de incentivos fiscais, recuperação de créditos tributários, entre outras estratégias. Nossa equipe de especialistas irá analisar o seu negócio e identificar oportunidades de economia fiscal dentro da legalidade.",
      category: "taxes",
      popular: false,
    },
    {
      question: "Quais são os serviços incluídos na contabilidade mensal?",
      answer:
        "Os serviços incluídos na contabilidade mensal variam de acordo com o plano contratado, mas geralmente incluem classificação e registro de documentos, elaboração de demonstrações financeiras, apuração de impostos, emissão de guias, folha de pagamento, entre outros. Oferecemos pacotes personalizados para atender às necessidades específicas do seu negócio.",
      category: "services",
      popular: true,
    },
  ]

  // Filter FAQs based on search term and active category
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory
    return matchesSearch && matchesCategory
  })

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
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  <span>Perguntas Frequentes</span>
                </div>
              </motion.div>
              <motion.h2
                className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Dúvidas Comuns Sobre Nossos Serviços
              </motion.h2>
              <motion.p
                className="text-gray-500 md:text-xl max-w-[700px] mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Encontre respostas para as perguntas mais frequentes sobre nossos serviços contábeis.
              </motion.p>
            </div>
          </div>
        </AnimateOnScroll>

        <div className="max-w-4xl mx-auto">
          {/* Search and filter */}
          <AnimateOnScroll variant="fade-up" duration={0.6}>
            <div className="mb-8 space-y-6">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Buscar perguntas frequentes..."
                  className="pl-10 py-6 bg-white border-gray-200 rounded-xl shadow-sm focus-visible:ring-[#00A7E1]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search className="h-5 w-5" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    className={`rounded-full px-4 py-2 text-sm ${
                      activeCategory === category.id
                        ? "bg-[#00A7E1] hover:bg-[#0089b8] text-white"
                        : "border-gray-200 text-gray-600 hover:border-[#00A7E1] hover:text-[#00A7E1]"
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Popular questions highlight */}
          {activeCategory === "all" && !searchTerm && (
            <AnimateOnScroll variant="fade-up" duration={0.6}>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-none">Popular</Badge>
                  <h3 className="text-lg font-medium text-gray-700">Perguntas mais frequentes</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {faqs
                    .filter((faq) => faq.popular)
                    .map((faq, index) => (
                      <motion.div
                        key={`popular-${index}`}
                        className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h4 className="font-medium text-gray-800 mb-2 flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-[#00A7E1] flex-shrink-0 mt-0.5" />
                          <span>{faq.question}</span>
                        </h4>
                        <p className="text-gray-600 text-sm line-clamp-2">{faq.answer}</p>
                      </motion.div>
                    ))}
                </div>
              </div>
            </AnimateOnScroll>
          )}

          {/* FAQ Accordion */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-[#00A7E1]" />
                <span>Todas as perguntas</span>
                {filteredFaqs.length > 0 && (
                  <Badge className="ml-2 bg-gray-100 text-gray-700 hover:bg-gray-200">{filteredFaqs.length}</Badge>
                )}
              </h3>
            </div>

            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="divide-y">
                {filteredFaqs.map((faq, index) => (
                  <AnimateOnScroll key={index} variant="fade-up" delay={index * 0.05} duration={0.5}>
                    <AccordionItem
                      value={`item-${index}`}
                      className="border-none data-[state=open]:bg-gray-50 transition-colors"
                    >
                      <AccordionTrigger className="px-6 py-5 hover:bg-gray-50 transition-colors duration-300 text-left">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 font-medium text-gray-800">{faq.question}</div>
                          {faq.popular && (
                            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-none">
                              Popular
                            </Badge>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-5 pt-0">
                        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                          <div className="mt-4 flex justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-[#00A7E1] border-[#00A7E1]/30 hover:bg-[#00A7E1]/10 hover:text-[#00A7E1] hover:border-[#00A7E1]"
                              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                            >
                              Precisa de mais detalhes?
                              <ChevronRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </AnimateOnScroll>
                ))}
              </Accordion>
            ) : (
              <div className="py-12 px-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <AlertCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Nenhuma pergunta encontrada</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Não encontramos perguntas que correspondam à sua busca. Tente outros termos ou entre em contato
                  conosco.
                </p>
                <Button
                  className="bg-[#00A7E1] hover:bg-[#0089b8]"
                  onClick={() => {
                    setSearchTerm("")
                    setActiveCategory("all")
                  }}
                >
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>

          <AnimateOnScroll variant="fade-up" duration={0.8}>
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-[#00A7E1]/10 to-[#0089b8]/10 p-6 rounded-xl border border-[#00A7E1]/20 shadow-sm max-w-2xl mx-auto">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Não encontrou a resposta que procurava?</h3>
                <p className="text-gray-600 mb-4">
                  Nossa equipe está pronta para esclarecer todas as suas dúvidas e fornecer informações personalizadas
                  para o seu negócio.
                </p>
                <Button
                  className="bg-gradient-to-r from-[#00A7E1] to-[#0089b8] hover:from-[#0089b8] hover:to-[#007ba8] text-white shadow-md"
                  onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Falar com um especialista
                </Button>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
