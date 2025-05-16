import type { Metadata } from "next"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import BlogPosts from "@/components/blog/blog-posts"
import BlogCategories from "@/components/blog/blog-categories"
import BlogNewsletter from "@/components/blog/blog-newsletter"
import AnimatedBackground from "@/components/shared/animated-background"
import NotFound from "../../[slug]/not-found"
import { getBlogPostsByTag, getCategories, getTags } from "@/lib/blog"
import { notFound } from "next/navigation"

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
    notFound()
  }

  return (
    <main className="min-h-screen">
      <BlogCategories categories={categories} />
      <BlogPosts posts={posts} />
    </main>
  )
}

