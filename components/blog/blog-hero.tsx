"use client"

import type React from "react"
import { getCategories } from "@/lib/blog"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"
import { motion } from "framer-motion"
import { Search, TrendingUp } from "lucide-react"

export default function BlogHero({
  title = "Conhecimento Contábil",
  subtitle = "Artigos, dicas e novidades sobre contabilidade, finanças, tributação e gestão empresarial para ajudar você a tomar as melhores decisões para o seu negócio.",
}: {
  title?: string
  subtitle?: string
}) {
  const router = useRouter()
  const trendingTopics = getCategories()

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
                {title.includes("Contábil") ? (
                  <>
                    {title.split("Contábil")[0]} <span className="text-[#00A7E1]">Contábil</span>
                    {title.split("Contábil")[1]}
                  </>
                ) : (
                  title
                )}
              </h1>
              <p className="text-gray-500 md:text-xl max-w-[700px] mx-auto">{subtitle}</p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-up" delay={200} duration={0.8}>


            <div className="mt-6 flex flex-wrap justify-center gap-2 items-center">
              <span className="text-sm text-gray-500 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" /> Tópicos em alta:
              </span>
              {trendingTopics.map((topic, index) => (
                <motion.button
                  key={topic}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index + 0.5 }}
                  className="text-xs bg-gray-100 hover:bg-[#00A7E1]/10 hover:text-[#00A7E1] px-3 py-1 rounded-full transition-colors"
                  onClick={() => router.push(`/blog/tag/${encodeURIComponent(topic.toLowerCase())}`)}
                >
                  {topic}
                </motion.button>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
