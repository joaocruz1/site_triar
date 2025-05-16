import Link from "next/link"

interface BlogCategoriesProps {
  categories: string[]
  activeCategory?: string
}

export default function BlogCategories({ categories, activeCategory }: BlogCategoriesProps) {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/blog"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !activeCategory ? "bg-teal-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Todos
          </Link>

          {categories.map((category) => (
            <Link
              key={category}
              href={`/blog/categoria/${encodeURIComponent(category.toLowerCase())}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory?.toLowerCase() === category.toLowerCase()
                  ? "bg-teal-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
