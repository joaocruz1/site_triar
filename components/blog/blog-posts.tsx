"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, User, MessageSquare, Share2, Bookmark, BookmarkCheck } from "lucide-react"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

// Tipo para os posts do blog
interface BlogPost {
  id: number
  title: string
  excerpt: string
  image: string
  date: string
  readTime: string
  author: string
  category: string
  tags: string[]
  commentCount: number
  slug: string
}

export default function BlogPosts({ initialFilter = "" }) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState(initialFilter)
  const [sortBy, setSortBy] = useState("recent")
  const [savedPosts, setSavedPosts] = useState<number[]>([])
  const postsPerPage = 5

  // Simular carregamento de dados
  useEffect(() => {
    setLoading(true)

    // Simular delay de carregamento
    setTimeout(() => {
      const allPosts: BlogPost[] = [
        {
          id: 1,
          title: "Como o planejamento tributário pode reduzir a carga de impostos da sua empresa",
          excerpt:
            "Descubra estratégias legais para reduzir a carga tributária da sua empresa e aumentar a lucratividade do seu negócio.",
          image: "/placeholder.svg?height=300&width=600",
          date: "15 de abril de 2023",
          readTime: "5 min de leitura",
          author: "Carlos Oliveira",
          category: "Tributário",
          tags: ["Impostos", "Planejamento", "Economia"],
          commentCount: 8,
          slug: "planejamento-tributario-reducao-impostos",
        },
        {
          id: 2,
          title: "As principais mudanças na legislação contábil para 2023",
          excerpt:
            "Fique por dentro das principais alterações na legislação contábil e fiscal que entram em vigor em 2023 e como elas afetam o seu negócio.",
          image: "/placeholder.svg?height=300&width=600",
          date: "28 de março de 2023",
          readTime: "7 min de leitura",
          author: "Ana Silva",
          category: "Legislação",
          tags: ["Legislação", "Atualização", "Contabilidade"],
          commentCount: 5,
          slug: "mudancas-legislacao-contabil-2023",
        },
        {
          id: 3,
          title: "Contabilidade digital: como a tecnologia está transformando o setor",
          excerpt:
            "Conheça as principais tendências tecnológicas que estão revolucionando a contabilidade e como elas podem beneficiar o seu negócio.",
          image: "/placeholder.svg?height=300&width=600",
          date: "10 de março de 2023",
          readTime: "6 min de leitura",
          author: "Roberto Santos",
          category: "Tecnologia",
          tags: ["Digital", "Inovação", "Tecnologia"],
          commentCount: 12,
          slug: "contabilidade-digital-transformacao-tecnologica",
        },
        {
          id: 4,
          title: "Guia completo sobre o Simples Nacional: vantagens e desvantagens",
          excerpt:
            "Entenda o que é o Simples Nacional, quem pode optar por esse regime tributário e quais são suas vantagens e desvantagens.",
          image: "/placeholder.svg?height=300&width=600",
          date: "22 de fevereiro de 2023",
          readTime: "8 min de leitura",
          author: "Juliana Costa",
          category: "Tributário",
          tags: ["Simples Nacional", "Tributação", "MEI"],
          commentCount: 15,
          slug: "guia-simples-nacional-vantagens-desvantagens",
        },
        {
          id: 5,
          title: "Como preparar sua empresa para uma auditoria fiscal",
          excerpt: "Dicas práticas para preparar sua empresa para uma auditoria fiscal e evitar problemas com o Fisco.",
          image: "/placeholder.svg?height=300&width=600",
          date: "5 de fevereiro de 2023",
          readTime: "6 min de leitura",
          author: "Carlos Oliveira",
          category: "Fiscal",
          tags: ["Auditoria", "Fiscal", "Compliance"],
          commentCount: 3,
          slug: "preparacao-auditoria-fiscal",
        },
        {
          id: 6,
          title: "O impacto da reforma tributária para pequenas e médias empresas",
          excerpt: "Análise detalhada de como a reforma tributária afetará o dia a dia das PMEs brasileiras.",
          image: "/placeholder.svg?height=300&width=600",
          date: "18 de janeiro de 2023",
          readTime: "9 min de leitura",
          author: "Marcos Silva",
          category: "Tributário",
          tags: ["Reforma Tributária", "PMEs", "Impostos"],
          commentCount: 21,
          slug: "impacto-reforma-tributaria-pmes",
        },
        {
          id: 7,
          title: "Como implementar um sistema ERP na sua empresa contábil",
          excerpt:
            "Guia passo a passo para escolher e implementar um sistema ERP que otimize os processos da sua empresa.",
          image: "/placeholder.svg?height=300&width=600",
          date: "3 de janeiro de 2023",
          readTime: "7 min de leitura",
          author: "Fernanda Lima",
          category: "Tecnologia",
          tags: ["ERP", "Sistemas", "Gestão"],
          commentCount: 9,
          slug: "implementacao-erp-empresa-contabil",
        },
        {
          id: 8,
          title: "Declaração de Imposto de Renda 2023: o que mudou e como se preparar",
          excerpt: "Confira as principais novidades da declaração de IR deste ano e prepare-se com antecedência.",
          image: "/placeholder.svg?height=300&width=600",
          date: "20 de dezembro de 2022",
          readTime: "5 min de leitura",
          author: "Ana Silva",
          category: "Fiscal",
          tags: ["Imposto de Renda", "IRPF", "Declaração"],
          commentCount: 18,
          slug: "declaracao-imposto-renda-2023-mudancas",
        },
      ]

      // Filtrar posts se necessário
      let filteredPosts = allPosts
      if (filter) {
        filteredPosts = allPosts.filter(
          (post) =>
            post.category.toLowerCase() === filter.toLowerCase() ||
            post.tags.some((tag) => tag.toLowerCase() === filter.toLowerCase()) ||
            post.title.toLowerCase().includes(filter.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(filter.toLowerCase()),
        )
      }

      // Ordenar posts
      if (sortBy === "recent") {
        // Já está ordenado por data
      } else if (sortBy === "popular") {
        filteredPosts = [...filteredPosts].sort((a, b) => b.commentCount - a.commentCount)
      }

      setPosts(filteredPosts)
      setLoading(false)
    }, 1000)
  }, [filter, sortBy, initialFilter])

  // Carregar posts salvos do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("savedPosts")
    if (saved) {
      setSavedPosts(JSON.parse(saved))
    }
  }, [])

  // Salvar/remover post
  const toggleSavePost = (id: number) => {
    const newSavedPosts = savedPosts.includes(id) ? savedPosts.filter((postId) => postId !== id) : [...savedPosts, id]

    setSavedPosts(newSavedPosts)
    localStorage.setItem("savedPosts", JSON.stringify(newSavedPosts))
  }

  // Calcular posts para a página atual
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(posts.length / postsPerPage)

  // Compartilhar post
  const sharePost = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: `/blog/${post.slug}`,
      })
    } else {
      // Fallback para copiar link
      navigator.clipboard.writeText(`${window.location.origin}/blog/${post.slug}`)
      alert("Link copiado para a área de transferência!")
    }
  }

  return (
    <div className="space-y-12">
      <AnimateOnScroll variant="fade-up" duration={0.8}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">
            {filter ? `Artigos sobre ${filter}` : "Artigos Recentes"}
            {loading ? null : <span className="text-sm font-normal text-gray-500 ml-2">({posts.length})</span>}
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`hidden md:flex ${sortBy === "recent" ? "bg-[#00A7E1]/10 text-[#00A7E1] border-[#00A7E1]" : ""}`}
              onClick={() => setSortBy("recent")}
            >
              Mais Recentes
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`hidden md:flex ${sortBy === "popular" ? "bg-[#00A7E1]/10 text-[#00A7E1] border-[#00A7E1]" : ""}`}
              onClick={() => setSortBy("popular")}
            >
              Mais Populares
            </Button>
          </div>
        </div>
      </AnimateOnScroll>

      <div className="space-y-10">
        {loading
          ? // Skeleton loading state
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md">
                <div className="md:flex">
                  <div className="md:w-1/3 relative h-60 md:h-auto">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <div className="flex flex-wrap items-center gap-4">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          : currentPosts.map((post, index) => (
              <AnimateOnScroll key={post.id} variant="fade-up" delay={index * 100} duration={0.6}>
                <motion.article
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="md:flex">
                    <div className="md:w-1/3 relative h-60 md:h-auto">
                      <Link href={`/blog/${post.slug}`} className="block h-full">
                        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                      </Link>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Link href={`/blog/categoria/${post.category.toLowerCase()}`}>
                          <Badge className="bg-[#00A7E1]/10 text-[#00A7E1] hover:bg-[#00A7E1]/20 border-none">
                            {post.category}
                          </Badge>
                        </Link>
                        {post.tags.slice(0, 2).map((tag) => (
                          <Link key={tag} href={`/blog/tag/${tag.toLowerCase()}`}>
                            <Badge variant="outline" className="hover:bg-gray-100">
                              {tag}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold mb-2 hover:text-[#00A7E1] transition-colors duration-300">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.commentCount} comentários</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-[#00A7E1] font-medium hover:underline inline-flex items-center gap-1"
                        >
                          Ler mais
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </Link>
                        <div className="flex gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 rounded-full"
                                  onClick={() => sharePost(post)}
                                >
                                  <Share2 className="h-4 w-4 text-gray-500 hover:text-[#00A7E1]" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Compartilhar</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 rounded-full"
                                  onClick={() => toggleSavePost(post.id)}
                                >
                                  {savedPosts.includes(post.id) ? (
                                    <BookmarkCheck className="h-4 w-4 text-[#00A7E1]" />
                                  ) : (
                                    <Bookmark className="h-4 w-4 text-gray-500 hover:text-[#00A7E1]" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{savedPosts.includes(post.id) ? "Salvo" : "Salvar para ler depois"}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </AnimateOnScroll>
            ))}
      </div>

      {/* Paginação */}
      {!loading && totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) setCurrentPage(currentPage - 1)
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentPage(i + 1)
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                }}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {!loading && posts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">Nenhum artigo encontrado</h3>
          <p className="text-gray-500 mb-6">Não encontramos artigos com os critérios selecionados.</p>
          <Button
            variant="outline"
            onClick={() => {
              setFilter("")
              setSortBy("recent")
            }}
          >
            Ver todos os artigos
          </Button>
        </div>
      )}

      {!loading && posts.length > 0 && (
        <div className="flex justify-center mt-12">
          <Button className="bg-[#00A7E1] hover:bg-[#0089b8] text-white">Carregar Mais Artigos</Button>
        </div>
      )}
    </div>
  )
}
