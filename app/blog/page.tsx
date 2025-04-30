import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import ParallaxProvider from "@/components/shared/parallax-provider"
import AnimatedBackground from "@/components/shared/animated-background"
import BlogHero from "@/components/blog/blog-hero"
import BlogCategories from "@/components/blog/blog-categories"
import BlogNewsletter from "@/components/blog/blog-newsletter"
import dynamic from "next/dynamic"

// Carregar componentes pesados dinamicamente
const DynamicBlogPosts = dynamic(() => import("@/components/blog/blog-posts"), {
  ssr: true,
  loading: () => <div className="lg:col-span-2 min-h-[500px]"></div>,
})

export const metadata = {
  title: "Blog | Triar Contabilidade",
  description: "Artigos e notícias sobre contabilidade, finanças e gestão empresarial",
}

export default function BlogPage() {
  return (
    <ParallaxProvider>
      <main className="min-h-screen">
        <AnimatedBackground color="rgba(0, 167, 225, 0.1)" density={15} />
        <Header />
        <BlogHero />
        <div className="container px-4 md:px-6 py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <DynamicBlogPosts />
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
