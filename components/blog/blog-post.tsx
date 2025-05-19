import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, User, Tag } from "lucide-react"
import type { BlogPost } from "@/lib/blog"
import styles from "@/app/blog/[slug]/page.module.css"
import { marked } from "marked"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"

interface BlogPostComponentProps {
  post: BlogPost
}

export default function BlogPostComponent({ post }: BlogPostComponentProps) {
  // Convert markdown to HTML
  const contentHtml = marked(post.content)

  return (
    <article className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <AnimateOnScroll variant="fade-up" duration={0.8}>
          <div className="mb-8">
            <Link href="/blog" className="text-[#00A7E1] hover:text-[#0089b8] mb-4 inline-block">
              ← Voltar para o blog
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{post.title}</h1>
            <div className="flex flex-wrap items-center text-gray-600 mb-6 gap-y-2">
              <div className="flex items-center mr-6">
                <User size={18} className="mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center mr-6">
                <Calendar size={18} className="mr-2" />
                <span>{new Date(post.date).toLocaleDateString("pt-BR")}</span>
              </div>
              <div className="flex items-center">
                <Clock size={18} className="mr-2" />
                <span>{post.readTime} min de leitura</span>
              </div>
            </div>
            <Link href={`/blog/categoria/${encodeURIComponent(post.category.toLowerCase())}`}>
              <span className="inline-block px-4 py-1 bg-[#00A7E1]/10 text-[#00A7E1] font-medium rounded-full mb-6">
                {post.category}
              </span>
            </Link>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll variant="fade-up" delay={200} duration={0.8}>
          <div className="relative w-full h-96 mb-10 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll variant="fade-up" delay={300} duration={0.8}>
          <div
            className={`${styles.content} bg-white p-8 rounded-lg shadow-md`}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </AnimateOnScroll>

        <AnimateOnScroll variant="fade-up" delay={400} duration={0.8}>
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
                  className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Tag size={14} className="mr-1" />
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </article>
  )
}
