"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

type AnimationVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "zoom-out"
  | "flip-up"
  | "flip-down"

interface AnimateOnScrollProps {
  children: ReactNode
  className?: string
  variant?: AnimationVariant
  delay?: number
  threshold?: number
  duration?: number
  once?: boolean
}

export default function AnimateOnScroll({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  threshold = 0.1,
  duration = 0.6,
  once = true,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Adiciona um pequeno atraso para evitar animações simultâneas
            setTimeout(() => {
              setIsVisible(true)
              if (once) {
                setHasAnimated(true)
              }
            }, delay)
          } else if (!once && !hasAnimated) {
            setIsVisible(false)
          }
        })
      },
      {
        threshold,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [delay, once, threshold, hasAnimated])

  // Configurações de animação baseadas na variante
  const getAnimationVariants = () => {
    switch (variant) {
      case "fade-up":
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }
      case "fade-down":
        return {
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 },
        }
      case "fade-left":
        return {
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 },
        }
      case "fade-right":
        return {
          hidden: { opacity: 0, x: 20 },
          visible: { opacity: 1, x: 0 },
        }
      case "zoom-in":
        return {
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1 },
        }
      case "zoom-out":
        return {
          hidden: { opacity: 0, scale: 1.05 },
          visible: { opacity: 1, scale: 1 },
        }
      case "flip-up":
        return {
          hidden: { opacity: 0, rotateX: 10 },
          visible: { opacity: 1, rotateX: 0 },
        }
      case "flip-down":
        return {
          hidden: { opacity: 0, rotateX: -10 },
          visible: { opacity: 1, rotateX: 0 },
        }
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }
    }
  }

  const variants = getAnimationVariants()

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible || hasAnimated ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}