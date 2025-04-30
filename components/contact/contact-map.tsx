"use client"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"

export default function ContactMap() {
  return (
    <section className="w-full py-12 bg-gray-50 relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <AnimateOnScroll variant="fade-up" duration={0.8}>
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-2xl font-bold">Nossa Localização</h2>
            <p className="text-gray-500 mt-2">
              Estamos localizados em um ponto estratégico de São Paulo, com fácil acesso.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll variant="fade-up" duration={0.8}>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0976951624756!2d-46.65390548502164!3d-23.564611284683726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c7f481fd9f%3A0x9982bfde4df54830!2sAv.%20Paulista%2C%201000%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001310-100!5e0!3m2!1spt-BR!2sbr!4v1650000000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
