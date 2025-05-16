import type { Metadata } from "next"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import BlogPost from "@/components/blog/blog-post"
import AnimatedBackground from "@/components/shared/animated-background"
import NotFound from "./not-found"
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}



export async function generateMetadata(props : Props): Promise<Metadata> {
  const params = await props.params
  const slug = params.slug
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: "Post não encontrado - Triar Contabilidade",
      description: "O artigo que você está procurando não foi encontrado.",
    }
  }

  return {
    title: `${post.title} - Triar Contabilidade`,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage(props : Props) {
  const params = await props.params
  const slug = params.slug
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
      <main className="min-h-screen">
        <AnimatedBackground color="rgba(0, 167, 225, 0.1)" density={15} />
        <Header />
        <BlogPost post={post} />
        <Footer />
      </main>
  )
}
