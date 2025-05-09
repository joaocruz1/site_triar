import type { Metadata } from "next"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import BlogPosts from "@/components/blog/blog-posts"
import BlogCategories from "@/components/blog/blog-categories"
import BlogNewsletter from "@/components/blog/blog-newsletter"
import AnimatedBackground from "@/components/shared/animated-background"

type Props = {
  params: Promise<{ tag: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// Fix the generateMetadata function to handle undefined values
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const tag = params.tag || ""
  // Safely format the tag with a fallback
  const formattedTag = tag.charAt(0).toUpperCase() + tag.slice(1)

  return {
    title: `${formattedTag} | Blog Triar Contabilidade`,
    description: `Artigos com a tag ${formattedTag.toLowerCase()} - Triar Contabilidade`,
  }
}

export default async function TagPage(props: Props) {
  const params = await props.params
  const tag = params.tag

  return (
      <main className="min-h-screen">
        <AnimatedBackground color="rgba(0, 167, 225, 0.1)" density={15} />
        <Header />
        <div className="container px-4 md:px-6 py-12 md:py-24">
          <h1 className="text-3xl font-bold mb-8">Tag: {tag}</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <BlogPosts initialFilter={tag} />
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
