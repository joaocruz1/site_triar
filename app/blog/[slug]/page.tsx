import type { Metadata } from "next"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import BlogPost from "@/components/blog/blog-post"
import AnimatedBackground from "@/components/shared/animated-background"

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// Simular busca de dados para um post específico
// Em uma aplicação real, estes dados viriam do banco de dados ou CMS
const fetchPostData = async (slug: string) => {
  // Lista de slugs disponíveis para simular verificação de existência
  const availableSlugs = [
    "planejamento-tributario-reducao-impostos",
    "mudancas-legislacao-contabil-2023",
    "contabilidade-digital-transformacao-tecnologica",
    "guia-simples-nacional-vantagens-desvantagens",
    "preparacao-auditoria-fiscal",
    "impacto-reforma-tributaria-pmes",
    "implementacao-erp-empresa-contabil",
    "declaracao-imposto-renda-2023-mudancas",
  ]

  if (!availableSlugs.includes(slug)) {
    return null
  }

  // Simula busca de dados (em uma aplicação real, seria uma chamada API/DB)
  const post = {
    title:
      slug === "planejamento-tributario-reducao-impostos"
        ? "Como o planejamento tributário pode reduzir a carga de impostos da sua empresa"
        : slug === "mudancas-legislacao-contabil-2023"
          ? "As principais mudanças na legislação contábil para 2023"
          : slug === "contabilidade-digital-transformacao-tecnologica"
            ? "Contabilidade digital: como a tecnologia está transformando o setor"
            : slug === "guia-simples-nacional-vantagens-desvantagens"
              ? "Guia completo sobre o Simples Nacional: vantagens e desvantagens"
              : "Artigo sobre " + slug.replace(/-/g, " "),
    excerpt:
      "Descubra estratégias legais para reduzir a carga tributária da sua empresa e aumentar a lucratividade do seu negócio.",
    category: slug.includes("tributario")
      ? "Tributário"
      : slug.includes("legislacao")
        ? "Legislação"
        : slug.includes("digital")
          ? "Tecnologia"
          : "Contabilidade",
  }

  return post
}

// Gerar metadata dinâmica baseada nos dados do post
export async function generateMetadata(props: Props): Promise<Metadata> {
  // Await params before accessing its properties
  const params = await props.params
  const slug = params.slug
  const post = await fetchPostData(slug)

  if (!post) {
    return {
      title: "Post não encontrado | Triar Contabilidade",
      description: "O artigo que você está procurando não existe ou foi removido.",
    }
  }

  return {
    title: `${post.title} | Blog Triar Contabilidade`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      authors: ["Triar Contabilidade"],
      publishedTime: new Date().toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostPage(props: Props) {
  // Await params before accessing its properties
  const params = await props.params
  const slug = params.slug

  return (
      <main className="min-h-screen">
        <AnimatedBackground color="rgba(0, 167, 225, 0.1)" density={15} />
        <Header />
        <BlogPost slug={slug} />
        <Footer />
      </main>
  )
}
