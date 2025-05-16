import blogPosts from "@/data/blog-posts.json"

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  tags: string[]
  image: string
  readTime: number
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category.toLowerCase() === category.toLowerCase())
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((post) => post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
}

export function getRecentBlogPosts(count = 3): BlogPost[] {
  return [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, count)
}

export function getCategories(): string[] {
  const categories = new Set(blogPosts.map((post) => post.category))
  return Array.from(categories)
}

export function getTags(): string[] {
  const tagsSet = new Set<string>()
  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag))
  })
  return Array.from(tagsSet)
}

export function searchBlogPosts(query: string): BlogPost[] {
  const searchTerm = query.toLowerCase()
  return blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      post.category.toLowerCase().includes(searchTerm),
  )
}
