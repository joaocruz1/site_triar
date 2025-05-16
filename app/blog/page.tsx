import type { Metadata } from "next"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import AnimatedBackground from "@/components/shared/animated-background"
import BlogHero from "@/components/blog/blog-hero"
import BlogPosts from "@/components/blog/blog-posts"
import BlogCategories from "@/components/blog/blog-categories"
import BlogNewsletter from "@/components/blog/blog-newsletter"
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
        <AnimatedBackground color="rgba(0, 167, 225, 0.1)" density={15} />
        <Header />
        <BlogHero />
        <div className="container px-4 md:px-6 py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <BlogPosts />
            </div>
            <div className="space-y-12">
              <BlogCategories />
              <BlogNewsletter />
            </div>
          </div>
        </div>
        <Footer />
      </main>
  )
}
