import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import Chatbot from "@/components/shared/chatbot"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Triar Contabilidade",
  description: "Soluções contábeis para o seu negócio crescer",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="overflow-x-hidden">
      <body className={`${inter.className} overflow-x-hidden`}>
          <div className="overflow-x-hidden w-full">
              {children}
              <Chatbot />
              <Toaster />
            </div>
      </body>
    </html>
  )
}
