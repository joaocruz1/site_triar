"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Tag } from "lucide-react"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"
import { getAllBlogPosts, getBlogPostsByCategory, getBlogPostsByTag, type BlogPost } from "@/lib/blog"

interface BlogPostsProps {
  posts?: BlogPost[]
  initialFilter?: string
}

export default function BlogPosts({ posts: providedPosts, initialFilter }: BlogPostsProps) {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    // If posts are directly provided, use them
    if (providedPosts) {
      setFilteredPosts(providedPosts)
      return
    }

    // Otherwise, filter based on initialFilter
    const allPosts = getAllBlogPosts()

    if (!initialFilter) {
      setFilteredPosts(allPosts)
      return
    }

    // Try to find posts by category first
    const categoryPosts = getBlogPostsByCategory(initialFilter)
    if (categoryPosts.length > 0) {
      setFilteredPosts(categoryPosts)
      return
    }

    // Then try by tag
    const tagPosts = getBlogPostsByTag(initialFilter)
    if (tagPosts.length > 0) {
      setFilteredPosts(tagPosts)
      return
    }

    // Fallback to search in title, content, etc.
    const searchResults = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(initialFilter.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(initialFilter.toLowerCase()) ||
        post.content.toLowerCase().includes(initialFilter.toLowerCase()),
    )

    setFilteredPosts(searchResults)
  }, [providedPosts, initialFilter])

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {initialFilter ? `Resultados para "${initialFilter}"` : "Artigos Recentes"}
        </h2>
        <Button variant="outline" className="border-[#00A7E1] text-[#00A7E1] hover:bg-[#00A7E1]/10">
          <Link href="/blog">Ver todos</Link>
        </Button>
      </div>

      <div className="space-y-10">
        {filteredPosts.map((post, index) => (
          <AnimateOnScroll key={post.id} variant="fade-up" delay={index * 100} duration={0.6}>
            <article className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 relative">
                  <div className="h-48 md:h-full relative">
                    <Image
                      src={post.image || "/placeholder.svg?height=300&width=500"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <Link href={`/blog/categoria/${encodeURIComponent(post.category.toLowerCase())}`}>
                    <span className="inline-block px-3 py-1 text-xs font-medium text-[#00A7E1] bg-[#00A7E1]/10 rounded-full mb-2">
                      {post.category}
                    </span>
                  </Link>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 hover:text-[#00A7E1] transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4 flex-wrap gap-y-2">
                    <span className="flex items-center mr-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.date).toLocaleDateString("pt-BR")}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime} min de leitura
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
                        className="inline-flex items-center text-xs text-gray-500 hover:text-[#00A7E1]"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Link>
                    ))}
                  </div>
                  <Link href={`/blog/${post.slug}`} className="inline-block text-[#00A7E1] font-medium hover:underline">
                    Ler mais →
                  </Link>
                </div>
              </div>
            </article>
          </AnimateOnScroll>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhum artigo encontrado.</p>
        </div>
      )}
    </div>
  )
}
