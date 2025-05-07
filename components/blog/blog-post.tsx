"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Header from "../layout/header"
import Footer from "../layout/footer"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar,
  Clock,
  MessageSquare,
  Bookmark,
  BookmarkCheck,
  ThumbsUp,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check,
  ArrowLeft,
  ArrowRight,
  Send,
  Share2,
  Eye,
  Heart,
  ChevronRight,
} from "lucide-react"

interface BlogPostProps {
  slug: string
}

export default function BlogPost({ slug }: BlogPostProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState<any>(null)
  const [isSaved, setIsSaved] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [hasLiked, setHasLiked] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("conteudo")
  const [copied, setCopied] = useState(false)
  const [estimatedReadTime, setEstimatedReadTime] = useState("0 min")
  const [relatedPosts, setRelatedPosts] = useState<any[]>([])
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")
  const contentRef = useRef<HTMLDivElement>(null)
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false)

  // Simular carregamento de dados
  useEffect(() => {
    // Simular delay de carregamento
    const timer = setTimeout(() => {
      const postData = {
        id: 1,
        title: "Como o planejamento tributário pode reduzir a carga de impostos da sua empresa",
        content: `
          <h2>Introdução ao Planejamento Tributário</h2>
          <p>O planejamento tributário é uma ferramenta essencial para empresas de todos os portes que buscam otimizar sua carga fiscal de forma legal. Diferente da sonegação fiscal, que é crime, o planejamento tributário utiliza mecanismos previstos em lei para reduzir o impacto dos impostos no fluxo de caixa da empresa.</p>
          
          <p>Segundo dados da Receita Federal, empresas brasileiras gastam em média 34% do seu faturamento com tributos. Com um planejamento tributário adequado, é possível reduzir essa carga em até 30%, dependendo do segmento e do regime tributário adotado.</p>
          
          <h2>Principais Estratégias de Planejamento Tributário</h2>
          
          <h3>1. Escolha do Regime Tributário Adequado</h3>
          <p>A escolha entre Simples Nacional, Lucro Presumido ou Lucro Real deve ser feita com base em uma análise detalhada do faturamento, margem de lucro e setor de atuação da empresa. Cada regime possui suas particularidades e pode ser mais vantajoso dependendo do perfil do negócio.</p>
          
          <h3>2. Aproveitamento de Incentivos Fiscais</h3>
          <p>Existem diversos incentivos fiscais disponíveis para empresas que investem em áreas como pesquisa e desenvolvimento, cultura, esporte e programas sociais. Identificar e utilizar esses incentivos pode gerar economia significativa.</p>
          
          <h3>3. Reorganização Societária</h3>
          <p>Em alguns casos, a reorganização da estrutura societária pode trazer benefícios fiscais. Isso inclui cisões, fusões, incorporações ou criação de holdings, sempre respeitando a legislação vigente e o propósito negocial.</p>
          
          <h3>4. Gestão de Créditos Tributários</h3>
          <p>Muitas empresas deixam de aproveitar créditos tributários a que têm direito. Uma gestão eficiente desses créditos, especialmente em tributos como PIS, COFINS e ICMS, pode representar economia significativa.</p>
          
          <h2>Casos de Sucesso</h2>
          <p>Uma empresa do setor de tecnologia conseguiu reduzir sua carga tributária em 25% após migrar do Lucro Presumido para o Lucro Real e implementar um sistema eficiente de aproveitamento de créditos de PIS e COFINS sobre insumos.</p>
          
          <p>Já uma rede de varejo economizou aproximadamente R$ 500 mil anuais ao reorganizar sua estrutura societária e centralizar operações logísticas em um estado com benefícios fiscais para o setor.</p>
          
          <h2>Riscos e Cuidados</h2>
          <p>É fundamental diferenciar planejamento tributário de evasão fiscal. Todas as estratégias adotadas devem estar em conformidade com a legislação vigente e serem devidamente documentadas. Contar com assessoria especializada é essencial para evitar problemas futuros com o fisco.</p>
          
          <h2>Conclusão</h2>
          <p>O planejamento tributário é uma ferramenta estratégica que, quando bem executada, pode representar um diferencial competitivo para as empresas. Investir em consultoria especializada e manter-se atualizado sobre as mudanças na legislação são passos fundamentais para garantir uma gestão tributária eficiente e segura.</p>
        `,
        excerpt:
          "Descubra estratégias legais para reduzir a carga tributária da sua empresa e aumentar a lucratividade do seu negócio.",
        image: "https://images.pexels.com/photos/6863254/pexels-photo-6863254.jpeg?height=500&width=1000",
        date: "15 de abril de 2023",
        author: {
          name: "Carlos Oliveira",
          role: "Contador Sênior",
          image: "/placeholder.svg?height=100&width=100",
          bio: "Contador com mais de 15 anos de experiência em planejamento tributário e gestão fiscal para empresas de diversos segmentos.",
        },
        category: "Tributário",
        tags: ["Impostos", "Planejamento", "Economia", "Gestão Fiscal"],
        commentCount: 8,
        likeCount: 42,
        viewCount: 1250,
      }

      // Calcular tempo de leitura
      const wordCount = postData.content.split(/\s+/).length
      const readingTime = Math.ceil(wordCount / 200) // 200 palavras por minuto
      setEstimatedReadTime(`${readingTime} min de leitura`)

      // Posts relacionados
      const relatedPostsData = [
        {
          id: 2,
          title: "As principais mudanças na legislação contábil para 2023",
          excerpt:
            "Fique por dentro das principais alterações na legislação contábil e fiscal que entram em vigor em 2023.",
          image: "/placeholder.svg?height=200&width=300",
          date: "28 de março de 2023",
          slug: "mudancas-legislacao-contabil-2023",
        },
        {
          id: 4,
          title: "Guia completo sobre o Simples Nacional: vantagens e desvantagens",
          excerpt:
            "Entenda o que é o Simples Nacional, quem pode optar por esse regime tributário e quais são suas vantagens e desvantagens.",
          image: "/placeholder.svg?height=200&width=300",
          date: "22 de fevereiro de 2023",
          slug: "guia-simples-nacional-vantagens-desvantagens",
        },
        {
          id: 6,
          title: "O impacto da reforma tributária para pequenas e médias empresas",
          excerpt: "Análise detalhada de como a reforma tributária afetará o dia a dia das PMEs brasileiras.",
          image: "/placeholder.svg?height=200&width=300",
          date: "18 de janeiro de 2023",
          slug: "impacto-reforma-tributaria-pmes",
        },
      ]

      // Comentários
      const commentsData = [
        {
          id: 1,
          author: "Mariana Silva",
          image: "/placeholder.svg?height=50&width=50",
          date: "16 de abril de 2023",
          content:
            "Excelente artigo! Implementamos algumas dessas estratégias na nossa empresa e conseguimos uma redução significativa na carga tributária.",
          likes: 5,
        },
        {
          id: 2,
          author: "Roberto Almeida",
          image: "/placeholder.svg?height=50&width=50",
          date: "17 de abril de 2023",
          content:
            "Gostaria de saber se essas estratégias se aplicam também para MEIs que estão pensando em migrar para ME.",
          likes: 2,
          replies: [
            {
              id: 3,
              author: "Carlos Oliveira",
              image: "/placeholder.svg?height=50&width=50",
              date: "17 de abril de 2023",
              content:
                "Olá Roberto! Sim, algumas estratégias podem ser adaptadas para MEIs em transição. Recomendo especialmente a análise cuidadosa do regime tributário mais vantajoso após a mudança.",
              likes: 3,
            },
          ],
        },
      ]

      setPost(postData)
      setLikeCount(postData.likeCount)
      setRelatedPosts(relatedPostsData)
      setComments(commentsData)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [slug])

  // Verificar se o post está salvo
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("savedPosts") || "[]")
    if (post && savedPosts.includes(post.id)) {
      setIsSaved(true)
    }
  }, [post])

  // Funções de interação
  const toggleSavePost = () => {
    if (!post) return

    const savedPosts = JSON.parse(localStorage.getItem("savedPosts") || "[]")
    let newSavedPosts

    if (isSaved) {
      newSavedPosts = savedPosts.filter((id: number) => id !== post.id)
    } else {
      newSavedPosts = [...savedPosts, post.id]
    }

    localStorage.setItem("savedPosts", JSON.stringify(newSavedPosts))
    setIsSaved(!isSaved)
  }

  const handleLike = () => {
    if (hasLiked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setHasLiked(!hasLiked)
  }

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentText.trim()) return

    const newComment = {
      id: Date.now(),
      author: "Você",
      image: "/placeholder.svg?height=50&width=50",
      date: new Date().toLocaleDateString("pt-BR"),
      content: commentText,
      likes: 0,
    }

    setComments([...comments, newComment])
    setCommentText("")
  }

  const handleReply = (commentId: number) => {
    if (!replyText.trim()) return

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...(comment.replies || []),
            {
              id: Date.now(),
              author: "Você",
              image: "/placeholder.svg?height=50&width=50",
              date: new Date().toLocaleDateString("pt-BR"),
              content: replyText,
              likes: 0,
            },
          ],
        }
      }
      return comment
    })

    setComments(updatedComments)
    setReplyText("")
    setReplyingTo(null)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOnSocial = (platform: string) => {
    if (!post) return

    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(post.title)

    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        break
      case "email":
        shareUrl = `mailto:?subject=${title}&body=${url}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank")
    }
  }

  // Rolar para cima quando a página carregar
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Progresso de leitura
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    const updateReadingProgress = () => {
      if (!contentRef.current) return

      const contentElement = contentRef.current
      const totalHeight = contentElement.scrollHeight - contentElement.clientHeight
      const windowScrollTop = window.scrollY - contentElement.offsetTop

      if (windowScrollTop > 0) {
        const scrolled = Math.min(100, Math.max(0, (windowScrollTop / totalHeight) * 100))
        setReadingProgress(scrolled)
      } else {
        setReadingProgress(0)
      }
    }

    window.addEventListener("scroll", updateReadingProgress)
    return () => window.removeEventListener("scroll", updateReadingProgress)
  }, [])

  // Loading state
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="h-12 w-3/4 mb-4" />
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-5 w-24" />
          </div>
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="h-[400px] w-full mb-8 rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-8 w-48 mt-8 mb-4" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <>
        <Header />
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Artigo não encontrado</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            O artigo que você está procurando não existe ou foi removido.
          </p>
          <Button asChild size="lg" className="bg-[#00A7E1] hover:bg-[#0089b8]">
            <Link href="/blog">Voltar para o Blog</Link>
          </Button>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      {/* Barra de progresso de leitura fixa no topo */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
        <motion.div
          className="h-full bg-[#00A7E1]"
          initial={{ width: "0%" }}
          animate={{ width: `${readingProgress}%` }}
          transition={{ duration: 0.1 }}
        ></motion.div>
      </div>

      {/* Botões flutuantes de compartilhamento */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col gap-3">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 bg-white shadow-md hover:bg-[#00A7E1] hover:text-white transition-all"
              onClick={() => shareOnSocial("facebook")}
            >
              <Facebook className="h-4 w-4" />
            </Button>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 bg-white shadow-md hover:bg-[#00A7E1] hover:text-white transition-all"
              onClick={() => shareOnSocial("twitter")}
            >
              <Twitter className="h-4 w-4" />
            </Button>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 bg-white shadow-md hover:bg-[#00A7E1] hover:text-white transition-all"
              onClick={() => shareOnSocial("linkedin")}
            >
              <Linkedin className="h-4 w-4" />
            </Button>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 bg-white shadow-md hover:bg-[#00A7E1] hover:text-white transition-all"
              onClick={copyToClipboard}
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Botão flutuante de compartilhamento mobile */}
      <div className="fixed right-4 bottom-4 z-40 lg:hidden">
        <div className="relative">
          <Button
            size="icon"
            className="rounded-full h-12 w-12 bg-[#00A7E1] text-white shadow-lg hover:bg-[#0089b8]"
            onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
          >
            <Share2 className="h-5 w-5" />
          </Button>

          <AnimatePresence>
            {isShareMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 0 }}
                animate={{ opacity: 1, scale: 1, y: -10 }}
                exit={{ opacity: 0, scale: 0.8, y: 0 }}
                className="absolute bottom-full right-0 mb-2 flex flex-col gap-2 items-end"
              >
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-10 w-10 bg-white shadow-md"
                    onClick={() => {
                      shareOnSocial("facebook")
                      setIsShareMenuOpen(false)
                    }}
                  >
                    <Facebook className="h-4 w-4 text-blue-600" />
                  </Button>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-10 w-10 bg-white shadow-md"
                    onClick={() => {
                      shareOnSocial("twitter")
                      setIsShareMenuOpen(false)
                    }}
                  >
                    <Twitter className="h-4 w-4 text-sky-500" />
                  </Button>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-10 w-10 bg-white shadow-md"
                    onClick={() => {
                      shareOnSocial("linkedin")
                      setIsShareMenuOpen(false)
                    }}
                  >
                    <Linkedin className="h-4 w-4 text-blue-700" />
                  </Button>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-10 w-10 bg-white shadow-md"
                    onClick={() => {
                      copyToClipboard()
                      setIsShareMenuOpen(false)
                    }}
                  >
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="bg-gradient-to-b from-gray-50 to-white pt-8 pb-4">
        <div className="max-w-5xl mx-auto px-4">
          {/* Breadcrumbs e categorias */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <Link href="/blog" className="hover:text-[#00A7E1] transition-colors">
                Blog
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                href={`/blog/categoria/${post.category.toLowerCase()}`}
                className="hover:text-[#00A7E1] transition-colors"
              >
                {post.category}
              </Link>
            </div>
            <Badge className="bg-[#00A7E1] hover:bg-[#0089b8] text-white">{post.category}</Badge>
          </div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700"
          >
            {post.title}
          </motion.h1>

          {/* Metadados do post */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center gap-6 mb-8 text-sm"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                <AvatarImage src={post.author.image || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <Link
                  href={`/blog/autor/${post.author.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="font-medium hover:text-[#00A7E1] transition-colors block"
                >
                  {post.author.name}
                </Link>
                <span className="text-gray-500 text-xs">{post.author.role}</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{estimatedReadTime}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Eye className="h-4 w-4" />
                <span>{post.viewCount} visualizações</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Imagem de destaque */}
      <div className="w-full bg-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl"
          >
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

            {/* Tags flutuantes na imagem */}
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag: string, index: number) => (
                <Link key={index} href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}>
                  <Badge className="bg-white/80 backdrop-blur-sm text-gray-800 hover:bg-white border-none">
                    #{tag}
                  </Badge>
                </Link>
              ))}
            </div>

            {/* Estatísticas flutuantes */}
            <div className="absolute bottom-4 right-4 flex items-center gap-3">
              <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
                <Heart className={`h-4 w-4 ${hasLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                <span className="text-sm font-medium text-gray-800">{likeCount}</span>
              </div>
              <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
                <MessageSquare className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-800">{comments.length}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Conteúdo do artigo e abas */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Tabs defaultValue="conteudo" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-8 w-full justify-start bg-transparent border-b p-0 gap-8 h-auto">
                <TabsTrigger
                  value="conteudo"
                  className={`border-b-2 rounded-none px-1 pb-2 text-base ${
                    activeTab === "conteudo"
                      ? "border-[#00A7E1] text-[#00A7E1]"
                      : "border-transparent hover:border-gray-300 text-gray-500"
                  }`}
                >
                  Artigo
                </TabsTrigger>
                <TabsTrigger
                  value="comentarios"
                  className={`border-b-2 rounded-none px-1 pb-2 text-base ${
                    activeTab === "comentarios"
                      ? "border-[#00A7E1] text-[#00A7E1]"
                      : "border-transparent hover:border-gray-300 text-gray-500"
                  }`}
                >
                  Comentários ({comments.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="conteudo" className="mt-0">
                {/* Conteúdo do artigo */}
                <article
                  ref={contentRef}
                  className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-[#00A7E1] prose-a:no-underline hover:prose-a:underline mb-10 prose-img:rounded-xl prose-img:shadow-md"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                <div className="mt-12 mb-8">
                  <h4 className="text-lg font-bold mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string, index: number) => (
                      <Link key={index} href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}>
                        <Badge variant="outline" className="hover:bg-gray-100 transition-colors">
                          #{tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Autor */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 my-10 flex flex-col md:flex-row gap-6 items-center md:items-start shadow-sm border border-gray-100"
                >
                  <Avatar className="h-20 w-20 border-4 border-white shadow-md">
                    <AvatarImage
                      src={post.author.image || "/placeholder.svg"}
                      alt={post.author.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-xl">{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-xl font-bold">{post.author.name}</h4>
                    <p className="text-[#00A7E1] font-medium">{post.author.role}</p>
                    <p className="text-gray-600 mt-3 mb-4">{post.author.bio}</p>
                    <Link
                      href={`/blog/autor/${post.author.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="inline-flex items-center gap-2 text-[#00A7E1] font-medium hover:underline"
                    >
                      Ver todos os artigos
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>

                {/* Navegação entre posts */}
                <div className="border-t border-b py-6 my-10">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <Button variant="outline" asChild className="flex gap-2 items-center group">
                      <Link href={`/blog/${relatedPosts[0]?.slug || ""}`}>
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="truncate">Post anterior</span>
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="flex gap-2 items-center group">
                      <Link href={`/blog/${relatedPosts[1]?.slug || ""}`}>
                        <span className="truncate">Próximo post</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Posts relacionados */}
                <div className="my-12">
                  <h3 className="text-2xl font-bold mb-8">Posts Relacionados</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                      >
                        <Link href={`/blog/${relatedPost.slug}`} className="block">
                          <div className="relative h-48 w-full">
                            <Image
                              src={relatedPost.image || "/placeholder.svg"}
                              alt={relatedPost.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                          </div>
                          <div className="p-5">
                            <p className="text-[#00A7E1] text-sm mb-2">{relatedPost.date}</p>
                            <h4 className="font-bold text-lg mb-2 line-clamp-2 hover:text-[#00A7E1] transition-colors">
                              {relatedPost.title}
                            </h4>
                            <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="comentarios" className="mt-0">
                <div className="my-6">
                  <h3 className="text-2xl font-bold mb-6">Comentários</h3>

                  {/* Formulário de comentário */}
                  <form
                    onSubmit={handleComment}
                    className="bg-gray-50 p-6 rounded-xl mb-8 shadow-sm border border-gray-100"
                  >
                    <h4 className="text-lg font-bold mb-4">Deixe seu comentário</h4>
                    <div className="mb-4">
                      <Textarea
                        placeholder="Escreva seu comentário..."
                        rows={4}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="min-h-[120px] resize-y focus:ring-[#00A7E1] focus:border-[#00A7E1]"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="bg-[#00A7E1] hover:bg-[#0089b8] flex items-center gap-2"
                      disabled={!commentText.trim()}
                    >
                      <Send className="h-4 w-4" />
                      Enviar Comentário
                    </Button>
                  </form>

                  {/* Lista de comentários */}
                  <div className="space-y-6">
                    {comments.length > 0 ? (
                      comments.map((comment) => (
                        <motion.div
                          key={comment.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                        >
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                              <AvatarImage src={comment.image || "/placeholder.svg"} alt={comment.author} />
                              <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex justify-between flex-wrap gap-2">
                                <div>
                                  <h5 className="font-bold">{comment.author}</h5>
                                  <p className="text-gray-500 text-sm">{comment.date}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 rounded-full"
                                    onClick={() => {
                                      // Lógica para curtir comentário aqui
                                    }}
                                  >
                                    <ThumbsUp className="h-4 w-4 text-gray-500 hover:text-[#00A7E1]" />
                                  </Button>
                                  <span className="text-sm text-gray-500">{comment.likes}</span>
                                </div>
                              </div>
                              <p className="my-3">{comment.content}</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-sm text-gray-500 hover:text-[#00A7E1] p-0 h-auto"
                                onClick={() => setReplyingTo(comment.id)}
                              >
                                Responder
                              </Button>

                              {/* Área de resposta */}
                              {replyingTo === comment.id && (
                                <div className="mt-4 pl-4 border-l-2 border-gray-200">
                                  <Input
                                    placeholder="Escreva sua resposta..."
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    className="mb-2 focus:ring-[#00A7E1] focus:border-[#00A7E1]"
                                  />
                                  <div className="flex gap-2">
                                    <Button
                                      variant="default"
                                      size="sm"
                                      className="bg-[#00A7E1] hover:bg-[#0089b8]"
                                      onClick={() => handleReply(comment.id)}
                                      disabled={!replyText.trim()}
                                    >
                                      <Send className="h-4 w-4 mr-1" /> Responder
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                                      Cancelar
                                    </Button>
                                  </div>
                                </div>
                              )}

                              {/* Respostas a este comentário */}
                              {comment.replies && comment.replies.length > 0 && (
                                <div className="mt-4 pl-4 border-l-2 border-gray-200 space-y-4">
                                  {comment.replies.map((reply: any) => (
                                    <div key={reply.id} className="bg-gray-50 p-4 rounded-lg">
                                      <div className="flex items-start gap-3">
                                        <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                                          <AvatarImage src={reply.image || "/placeholder.svg"} alt={reply.author} />
                                          <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                          <div className="flex justify-between flex-wrap gap-2">
                                            <div>
                                              <h5 className="font-bold text-sm">{reply.author}</h5>
                                              <p className="text-gray-500 text-xs">{reply.date}</p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                                                <ThumbsUp className="h-3 w-3 text-gray-500 hover:text-[#00A7E1]" />
                                              </Button>
                                              <span className="text-xs text-gray-500">{reply.likes}</span>
                                            </div>
                                          </div>
                                          <p className="my-2 text-sm">{reply.content}</p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-10 bg-gray-50 rounded-xl">
                        <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">Seja o primeiro a comentar neste artigo!</p>
                        <Button
                          className="bg-[#00A7E1] hover:bg-[#0089b8]"
                          onClick={() => document.querySelector("textarea")?.focus()}
                        >
                          Deixar um comentário
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Barra lateral */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-8">
              {/* Botões de interação */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <h4 className="font-bold mb-4">Interações</h4>
                <div className="flex flex-col gap-3">
                  <Button
                    variant={hasLiked ? "default" : "outline"}
                    className={`flex justify-between w-full ${hasLiked ? "bg-[#00A7E1] hover:bg-[#0089b8]" : ""}`}
                    onClick={handleLike}
                  >
                    <div className="flex items-center gap-2">
                      <Heart className={`h-4 w-4 ${hasLiked ? "fill-white" : ""}`} />
                      <span>{hasLiked ? "Curtido" : "Curtir"}</span>
                    </div>
                    <span>{likeCount}</span>
                  </Button>
                  <Button
                    variant={isSaved ? "default" : "outline"}
                    className={`flex justify-between w-full ${isSaved ? "bg-[#00A7E1] hover:bg-[#0089b8]" : ""}`}
                    onClick={toggleSavePost}
                  >
                    <div className="flex items-center gap-2">
                      {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                      <span>{isSaved ? "Salvo" : "Salvar"}</span>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex justify-between w-full"
                    onClick={() => setActiveTab("comentarios")}
                  >
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>Comentar</span>
                    </div>
                    <span>{comments.length}</span>
                  </Button>
                </div>
              </motion.div>

              {/* CTA Newsletter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-br from-[#00A7E1] to-[#0089b8] text-white rounded-xl p-6 shadow-lg"
              >
                <h4 className="font-bold text-xl mb-2">Inscreva-se na Newsletter</h4>
                <p className="text-white/90 text-sm mb-4">
                  Receba as últimas novidades sobre contabilidade e gestão financeira.
                </p>
                <div className="space-y-3">
                  <Input
                    placeholder="Seu email"
                    className="bg-white/10 border-white/20 placeholder:text-white/60 text-white focus:ring-white/50"
                  />
                  <Button className="w-full bg-white text-[#00A7E1] hover:bg-white/90 font-medium">Inscrever-se</Button>
                </div>
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <h4 className="font-bold mb-4">Tags Populares</h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string, index: number) => (
                    <Link key={index} href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}>
                      <Badge variant="outline" className="hover:bg-gray-100 transition-colors py-1.5 px-3">
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                  <Link href="/blog/tags">
                    <Badge variant="outline" className="hover:bg-gray-100 transition-colors py-1.5 px-3 bg-gray-50">
                      Ver todas
                    </Badge>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
