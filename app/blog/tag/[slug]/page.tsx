import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import BlogPosts from "@/components/blog/blog-posts"

interface TagPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  // Capitalize first letter of tag
  const tagName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1)

  return {
    title: `Artigos com a tag ${tagName} | Triar Contabilidade`,
    description: `Confira nossos artigos e conteúdos com a tag ${tagName} para empresas e empreendedores.`,
  }
}

export default function TagPage({ params }: TagPageProps) {
  // Capitalize first letter of tag
  const tagName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Tag: {tagName}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Confira todos os nossos artigos e conteúdos com a tag {tagName}.
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
