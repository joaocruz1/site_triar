import BlogPost from "@/components/blog/blog-post"
import type { Metadata } from "next"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Função para gerar metadados dinâmicos
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  // Em um cenário real, você buscaria os dados do post de uma API ou banco de dados
  // Aqui estamos simulando para o post de exemplo

  const title = "Como o planejamento tributário pode reduzir a carga de impostos da sua empresa"
  const description =
    "Descubra estratégias legais para reduzir a carga tributária da sua empresa e aumentar a lucratividade do seu negócio."

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: "article",
      publishedTime: "2023-04-15T00:00:00Z",
      authors: ["Carlos Oliveira"],
      tags: ["Impostos", "Planejamento", "Economia", "Gestão Fiscal"],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return <BlogPost slug={params.slug} />
}
