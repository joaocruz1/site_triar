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
      <BlogCategories categories={categories} activeCategory={decodedCategory} />
      <BlogPosts posts={posts} />
    </main>
  )
}
