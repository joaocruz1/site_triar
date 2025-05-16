import type { Metadata } from "next"
import BlogPosts from "@/components/blog/blog-posts"
import BlogCategories from "@/components/blog/blog-categories"
import BlogHero from "@/components/blog/blog-hero"
import BlogNewsletter from "@/components/blog/blog-newsletter"
import AnimatedBackground from "@/components/shared/animated-background"
import { getBlogPostsByCategory, getCategories } from "@/lib/blog"
import NotFound from "../../[slug]/not-found"


type Props = {
  params: Promise<{ category: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(props : Props): Promise<Metadata> {
  const params = await props.params
  const category = params.category
  const decodedCategory = decodeURIComponent(category)
  const posts = getBlogPostsByCategory(decodedCategory)

  if (posts.length === 0) {
    return {
      title: "Categoria não encontrada - Triar Contabilidade",
      description: "A categoria que você está procurando não foi encontrada.",
    }
  }

  return {
    title: `${decodedCategory} - Blog Triar Contabilidade`,
    description: `Artigos sobre ${decodedCategory} - Dicas, novidades e informações para sua empresa.`,
  }
}

export async function generateStaticParams() {
  const categories = getCategories()

  return categories.map((category) => ({
    category: encodeURIComponent(category.toLowerCase()),
  }))
}

export default async function CategoryPage(props : Props) {

  const params = await props.params
  const category = params.category
  const decodedCategory = decodeURIComponent(category)
  const posts = getBlogPostsByCategory(decodedCategory)
  const categories = getCategories()

  if (posts.length === 0) {
    NotFound()
  }

  return (
      <main className="min-h-screen">
        <AnimatedBackground color="rgba(0, 167, 225, 0.1)" density={15} />
        <BlogHero
          title={`Categoria: ${decodedCategory}`}
          subtitle={`Artigos sobre ${decodedCategory} - Dicas, novidades e informações para sua empresa.`}
        />
        <div className="container px-4 md:px-6 py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <BlogPosts initialFilter={decodedCategory} />
            </div>
            <div className="space-y-12">
              <BlogCategories activeCategory={decodedCategory} />
              <BlogNewsletter />
            </div>
          </div>
        </div>
      </main>

  )
}
