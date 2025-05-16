import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, Tag } from "lucide-react"
import type { BlogPost } from "@/lib/blog"

interface BlogPostsProps {
  posts: BlogPost[]
}

export default function BlogPosts({ posts }: BlogPostsProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-60 w-full">
                  <Image
                    src={post.image || "/images/blog/default.jpg"}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
              <div className="p-6">
                <Link href={`/blog/categoria/${encodeURIComponent(post.category.toLowerCase())}`}>
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-teal-700 bg-teal-100 rounded-full mb-4">
                    {post.category}
                  </span>
                </Link>
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-teal-600 transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar size={16} className="mr-1" />
                  <span className="mr-4">{new Date(post.date).toLocaleDateString("pt-BR")}</span>
                  <Clock size={16} className="mr-1" />
                  <span>{post.readTime} min de leitura</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
                      className="inline-flex items-center text-xs text-gray-600 hover:text-teal-600"
                    >
                      <Tag size={12} className="mr-1" />
                      {tag}
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block text-teal-600 font-medium hover:text-teal-800 transition-colors"
                >
                  Ler mais →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
