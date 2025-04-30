import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import BlogPosts from "@/components/blog/blog-posts"

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

export const metadata: Metadata = {
  title: "Resultados da pesquisa | Triar Contabilidade",
  description: "Resultados da pesquisa no blog da Triar Contabilidade",
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Resultados da pesquisa</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {query ? `Mostrando resultados para "${query}"` : "Nenhum termo de pesquisa fornecido"}
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <Button variant="outline" asChild>
          <Link href="/blog">Voltar para o Blog</Link>
        </Button>
      </div>

      {query ? (
        <BlogPosts initialFilter={query} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Por favor, forneça um termo de pesquisa para encontrar artigos.</p>
          <Button asChild>
            <Link href="/blog">Explorar todos os artigos</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
