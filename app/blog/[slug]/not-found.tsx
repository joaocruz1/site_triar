import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <h2 className="text-3xl font-bold mb-2">Artigo não encontrado</h2>
      <p className="text-gray-500 max-w-md mb-8">O artigo que você está procurando não existe ou foi removido.</p>
      <div className="space-x-4">
        <Button asChild variant="default" className="bg-[#00A7E1] hover:bg-[#0089b8]">
          <Link href="/blog">Voltar ao Blog</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Página Inicial</Link>
        </Button> 
      </div>
    </div>
  )
}
