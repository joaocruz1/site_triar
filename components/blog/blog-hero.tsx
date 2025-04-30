"use client"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function BlogHero() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/blog/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

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
                Blog
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Conhecimento <span className="text-[#00A7E1]">Contábil</span>
              </h1>
              <p className="text-gray-500 md:text-xl max-w-[700px] mx-auto">
                Artigos, dicas e novidades sobre contabilidade, finanças, tributação e gestão empresarial para ajudar
                você a tomar as melhores decisões para o seu negócio.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-up" delay={200} duration={0.8}>
            <div className="mt-8 w-full max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pesquisar artigos..."
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A7E1]/20 focus:border-[#00A7E1]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button 
                  onClick={handleSearch}
                  className="absolute right-1 top-1 bg-[#00A7E1] text-white p-2 rounded-full hover:bg-[#0089b8] transition-colors duration-300"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}