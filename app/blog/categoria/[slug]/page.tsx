import type { Metadata } from "next"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import BlogPosts from "@/components/blog/blog-posts"
import BlogCategories from "@/components/blog/blog-categories"
import BlogNewsletter from "@/components/blog/blog-newsletter"
import ParallaxProvider from "@/components/shared/parallax-provider"
import AnimatedBackground from "@/components/shared/animated-background"

type Props = {
  params: Promise<{ category: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// Fix the generateMetadata function to handle undefined values
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const category = params.category || ""
  // Safely format the category with a fallback
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1)

  return {
    title: `${formattedCategory} | Blog Triar Contabilidade`,
    description: `Artigos sobre ${formattedCategory.toLowerCase()} - Triar Contabilidade`,
  }
}

export default async function CategoryPage(props: Props) {
  const params = await props.params
  const category = params.category

  return (
    <ParallaxProvider>
      <main className="min-h-screen">
        <AnimatedBackground color="rgba(0, 167, 225, 0.1)" density={15} />
        <Header />
        <div className="container px-4 md:px-6 py-12 md:py-24">
          <h1 className="text-3xl font-bold mb-8">Categoria: {category}</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <BlogPosts initialFilter={category} />
            </div>
            <div className="space-y-12">
              <BlogCategories />
              <BlogNewsletter />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </ParallaxProvider>
  )
}
