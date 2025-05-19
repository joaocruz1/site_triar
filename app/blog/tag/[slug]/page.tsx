import type { Metadata } from "next"
import BlogPosts from "@/components/blog/blog-posts"
import BlogCategories from "@/components/blog/blog-categories"
import BlogNewsletter from "@/components/blog/blog-newsletter"
import AnimatedBackground from "@/components/shared/animated-background"
import { getBlogPostsByTag, getCategories, getTags } from "@/lib/blog"
import NotFound from "../../[slug]/not-found"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import BlogHero from "@/components/blog/blog-hero"

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// Fix the generateMetadata function to handle undefined values
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const slug = params.slug || ""
  // Safely format the tag with a fallback
  const formattedTag = slug.charAt(0).toUpperCase() + slug.slice(1)

  return {
    title: `${formattedTag} | Blog Triar Contabilidade`,
    description: `Artigos com a tag ${formattedTag.toLowerCase()} - Triar Contabilidade`,
  }
}

export async function generateStaticParams() {
  const tags = getTags()

  return tags.map((tag) => ({
    tag: encodeURIComponent(tag.toLowerCase()),
  }))
}

export default async function TagPage(props: Props) {
  const params = await props.params
  const tag = params.slug
  const decodedTag = decodeURIComponent(tag)
  const posts = getBlogPostsByTag(decodedTag)
  const categories = getCategories()

  if (posts.length === 0) {
    NotFound()
  }

  return (
      <main className="min-h-screen">
        <AnimatedBackground color="rgba(0, 167, 225, 0.1)" density={15} />
        <Header />
        <BlogHero />
        <div className="container px-4 md:px-6 py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <BlogPosts initialFilter={decodedTag} />
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

