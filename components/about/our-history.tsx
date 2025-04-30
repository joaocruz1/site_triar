"use client"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"

export default function OurHistory() {
  const timelineEvents = [
    {
      year: "2010",
      title: "Fundação",
      description: "A Triar Contabilidade foi fundada com o objetivo de oferecer serviços contábeis de qualidade.",
    },
    {
      year: "2013",
      title: "Expansão",
      description: "Ampliamos nossa equipe e expandimos nossos serviços para atender mais segmentos do mercado.",
    },
    {
      year: "2016",
      title: "Digitalização",
      description: "Implementamos sistemas digitais avançados para otimizar nossos processos contábeis.",
    },
    {
      year: "2019",
      title: "Certificação",
      description: "Conquistamos certificações importantes que atestam a qualidade dos nossos serviços.",
    },
    {
      year: "2022",
      title: "Novo Escritório",
      description: "Inauguramos nossa nova sede com infraestrutura moderna para melhor atender nossos clientes.",
    },
  ]

  return (
    <section className="w-full py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <AnimateOnScroll variant="fade-up" duration={0.8}>
          <div className="flex flex-col items-center text-center mb-12">
            <div className="space-y-2">
              <div className="inline-block bg-[#00A7E1]/10 text-[#00A7E1] px-3 py-1 rounded-full text-sm font-medium mb-2">
                Nossa História
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Uma Trajetória de Sucesso e Crescimento
              </h2>
              <p className="text-gray-500 md:text-xl max-w-[700px] mx-auto">
                Conheça a história da Triar Contabilidade e como nos tornamos referência no mercado contábil.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 hidden md:block"></div>

          {/* Timeline events */}
          <div className="space-y-12 relative">
            {timelineEvents.map((event, index) => (
              <AnimateOnScroll key={index} variant={index % 2 === 0 ? "fade-right" : "fade-left"} duration={0.8}>
                <div className="flex flex-col md:flex-row items-center">
                  <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:order-last"}`}>
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                      <div className="text-[#00A7E1] font-bold text-xl mb-2">{event.year}</div>
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-[#00A7E1] text-white font-bold absolute left-1/2 transform -translate-x-1/2">
                    {index + 1}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>

        <AnimateOnScroll variant="fade-up" duration={0.8}>
          <div className="mt-16 text-center">
            <p className="text-gray-500 md:text-lg max-w-[800px] mx-auto">
              Hoje, a Triar Contabilidade é reconhecida pela excelência em serviços contábeis, atendendo mais de 500
              clientes em diversos segmentos. Continuamos comprometidos com a inovação e a qualidade, sempre buscando as
              melhores soluções para nossos clientes.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
