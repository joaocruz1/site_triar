import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import BlogPosts from "@/components/blog/blog-posts"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  // Capitalize first letter of category
  const categoryName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1)

  return {
    title: `Artigos sobre ${categoryName} | Triar Contabilidade`,
    description: `Confira nossos artigos e conteúdos sobre ${categoryName} para empresas e empreendedores.`,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  // Capitalize first letter of category
  const categoryName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Categoria: {categoryName}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Confira todos os nossos artigos e conteúdos sobre {categoryName} para ajudar sua empresa a crescer.
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <Button variant="outline" asChild>
          <Link href="/blog">Voltar para o Blog</Link>
        </Button>
      </div>

      <BlogPosts initialFilter={params.slug} />
    </div>
  )
}
