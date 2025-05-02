"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Search, Tag, Clock, TrendingUp } from "lucide-react"

export default function BlogCategories() {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [savedPosts, setSavedPosts] = useState<number[]>([])

  const categories = [
    { name: "Tributario", count: 12 },
    { name: "Contabilidade", count: 8 },
    { name: "Fiscal", count: 7 },
    { name: "Legislacao", count: 6 },
    { name: "Departamento Pessoal", count: 5 },
    { name: "Tecnologia", count: 4 },
    { name: "Gestao Empresarial", count: 3 },
  ]

  const recentPosts = [
    {
      id: 1,
      title: "Como o planejamento tributário pode reduzir a carga de impostos",
      date: "15 de abril de 2023",
      slug: "planejamento-tributario-reducao-impostos",
    },
    {
      id: 2,
      title: "As principais mudanças na legislação contábil para 2023",
      date: "28 de março de 2023",
      slug: "mudancas-legislacao-contabil-2023",
    },
    {
      id: 3,
      title: "Contabilidade digital: como a tecnologia está transformando o setor",
      date: "10 de março de 2023",
      slug: "contabilidade-digital-transformacao-tecnologica",
    },
  ]

  const popularTags = [
    "Impostos",
    "MEI",
    "Simples Nacional",
    "IRPJ",
    "Folha de Pagamento",
    "eSocial",
    "ERP",
    "Notas Fiscais",
    "Balanco",
    "Auditoria",
    "Lucro Real",
    "Lucro Presumido",
  ]

  // Filtrar tags com base na pesquisa
  const filteredTags = searchTerm
    ? popularTags.filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    : popularTags

  // Simular carregamento
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  // Carregar posts salvos
  useEffect(() => {
    const saved = localStorage.getItem("savedPosts")
    if (saved) {
      setSavedPosts(JSON.parse(saved))
    }
  }, [])

  // Posts salvos para leitura posterior
  const savedPostsData = [
    {
      id: 1,
      title: "Como o planejamento tributário pode reduzir a carga de impostos",
      slug: "planejamento-tributario-reducao-impostos",
    },
    {
      id: 2,
      title: "As principais mudanças na legislação contábil para 2023",
      slug: "mudancas-legislacao-contabil-2023",
    },
    {
      id: 4,
      title: "Guia completo sobre o Simples Nacional: vantagens e desvantagens",
      slug: "guia-simples-nacional-vantagens-desvantagens",
    },
  ]

  return (
    <div className="space-y-8">
      <AnimateOnScroll variant="fade-left" duration={0.8}>
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold mb-4">Categorias</h3>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-8" />
                </div>
              ))}
            </div>
          ) : (
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/blog/categoria/${category.name.toLowerCase()}`}
                    className="flex items-center justify-between py-2 border-b border-gray-100 group"
                  >
                    <span className="group-hover:text-[#00A7E1] transition-colors duration-300">{category.name}</span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full group-hover:bg-[#00A7E1]/10 group-hover:text-[#00A7E1] transition-colors duration-300">
                      {category.count}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll variant="fade-left" delay={200} duration={0.8}>
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold mb-4">Posts Recentes</h3>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="space-y-1">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          ) : (
            <ul className="space-y-4">
              {recentPosts.map((post, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group">
                    <h4 className="font-medium group-hover:text-[#00A7E1] transition-colors duration-300">
                      {post.title}
                    </h4>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {post.date}
                    </p>
                  </Link>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll variant="fade-left" delay={300} duration={0.8}>
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Tags</h3>
            <div className="flex items-center text-xs text-gray-500">
              <TrendingUp className="h-3 w-3 mr-1" /> Populares
            </div>
          </div>

          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar tags..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} className="h-7 w-16 rounded-full" />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {filteredTags.map((tag, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 + 0.4 }}
                >
                  <Link
                    href={`/blog/tag/${tag.toLowerCase().replace(" ", "-")}`}
                    className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-[#00A7E1]/10 hover:text-[#00A7E1] transition-colors duration-300"
                  >
                    <Tag className="h-3 w-3" /> {tag}
                  </Link>
                </motion.div>
              ))}

              {searchTerm && filteredTags.length === 0 && (
                <p className="text-sm text-gray-500 py-2">Nenhuma tag encontrada.</p>
              )}
            </div>
          )}
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll variant="fade-left" delay={400} duration={0.8}>
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold mb-4">Leitura Posterior</h3>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="space-y-1">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          ) : savedPosts.length > 0 ? (
            <ul className="space-y-3">
              {savedPostsData.map((post, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="border-b border-gray-100 pb-2 last:border-0"
                >
                  <Link href={`/blog/${post.slug}`} className="group">
                    <h4 className="font-medium group-hover:text-[#00A7E1] transition-colors duration-300">
                      {post.title}
                    </h4>
                  </Link>
                </motion.li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500 text-sm">
                Nenhum artigo salvo. Clique no ícone de marcador em qualquer artigo para salvá-lo para leitura
                posterior.
              </p>
            </div>
          )}
        </div>
      </AnimateOnScroll>
    </div>
  )
}
