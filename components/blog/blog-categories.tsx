import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getTags, getCategories } from "@/lib/blog"
import { Tag } from "lucide-react"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"

interface BlogCategoriesProps {
  activeCategory?: string
}

export default function BlogCategories({ activeCategory }: BlogCategoriesProps) {
  const categories = getCategories()
  const tags = getTags().slice(0, 10) // Limit to top 10 tags

  return (
    <AnimateOnScroll variant="fade-left" duration={0.8}>
      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-lg">Categorias</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  href={`/blog/categoria/${encodeURIComponent(category.toLowerCase())}`}
                  className={`block p-2 rounded-md transition-colors hover:bg-gray-100 ${
                    activeCategory?.toLowerCase() === category.toLowerCase()
                      ? "bg-[#00A7E1]/10 text-[#00A7E1] font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-medium mb-3 flex items-center gap-1">
              <Tag className="h-4 w-4" /> Tags populares
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
                  className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimateOnScroll>
  )
}
