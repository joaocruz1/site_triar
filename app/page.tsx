import type { Metadata } from "next"
import BlogHero from "@/components/blog/blog-hero"
import BlogPosts from "@/components/blog/blog-posts"
import BlogCategories from "@/components/blog/blog-categories"
import BlogNewsletter from "@/components/blog/blog-newsletter"
import CallToAction from "@/components/shared/call-to-action"
import { getAllBlogPosts, getCategories } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog - Triar Contabilidade",
  description: "Artigos, dicas e novidades sobre contabilidade, finanças e gestão empresarial.",
}

export default function BlogPage() {
  const posts = getAllBlogPosts()
  const categories = getCategories()

  return (
    <main className="min-h-screen">
      <BlogHero />
      <BlogCategories categories={categories} />
      <BlogPosts posts={posts} />
      <BlogNewsletter />
    </main>
  )
}
