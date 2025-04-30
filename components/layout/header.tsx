"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/layout/logo"
import AnimateOnScroll from "@/components/shared/animate-on-scroll"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    { name: "Início", href: "/" },
    { name: "Serviços", href: "/servicos" },
    { name: "Sobre", href: "/sobre" },
    { name: "Blog", href: "/blog" },
    { name: "Contato", href: "/contato" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when path changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white"
      }`}
    >
      <div className="container flex h-16 md:h-20 items-center justify-between px-4 md:px-6">
        <AnimateOnScroll variant="fade-right" duration={0.8} once>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Logo />
          </motion.div>
        </AnimateOnScroll>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {menuItems.map((item, index) => (
            <AnimateOnScroll key={item.name} variant="fade-down" delay={index * 100} duration={0.5} once>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ y: -2 }}
              >
                <Link
                  href={item.href}
                  className={`relative text-base font-medium transition-colors hover:text-[#00A7E1] ${
                    isActive(item.href) ? "text-[#00A7E1]" : "text-gray-700"
                  } group`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-[#00A7E1] transition-all duration-300 ${
                      isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              </motion.div>
            </AnimateOnScroll>
          ))}
        </nav>

        <AnimateOnScroll variant="fade-left" duration={0.8} once>
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-[#00A7E1] hover:bg-[#0089b8] text-white relative overflow-hidden group px-6"
                onClick={() => (window.location.href = "/contato")}
              >
                <span className="relative z-10">Fale Conosco</span>
                <span className="absolute inset-0 bg-[#0089b8] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Button>
            </motion.div>
          </motion.div>
        </AnimateOnScroll>

        {/* Mobile Navigation Button */}
        <motion.button
          className="md:hidden p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.button>

        {/* Mobile Navigation Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            ></motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed top-16 right-0 bottom-0 w-4/5 max-w-xs bg-white shadow-lg z-50 md:hidden flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex-1 p-6 overflow-auto">
                <nav className="flex flex-col gap-4">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="w-full"
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between rounded-lg p-3 text-base font-medium transition-colors ${
                          isActive(item.href) ? "bg-[#00A7E1]/10 text-[#00A7E1]" : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span>{item.name}</span>
                        <ChevronRight
                          className={`h-5 w-5 ${isActive(item.href) ? "text-[#00A7E1]" : "text-gray-400"}`}
                        />
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    className="w-full bg-[#00A7E1] hover:bg-[#0089b8] text-white py-6"
                    onClick={() => {
                      setIsMenuOpen(false)
                      window.location.href = "/contato"
                    }}
                  >
                    Fale Conosco
                  </Button>
                </motion.div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    Entre em contato: <br />
                    <a href="tel:1199999999" className="text-[#00A7E1] hover:underline">
                      (11) 9999-9999
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
