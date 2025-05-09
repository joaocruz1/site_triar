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
  disabled?: boolean // New prop to disable animations
}

export default function AnimateOnScroll({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  threshold = 0.1,
  duration = 0.6,
  once = true,
  disabled = false, // Default to enabled animations
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Check if we're on a mobile device with a simple check
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768

  // Reduce animation complexity on mobile
  const actualDuration = isMobile ? Math.min(duration, 0.4) : duration

  // Skip animation logic entirely if disabled
  if (disabled) {
    return <div className={className}>{children}</div>
  }

  useEffect(() => {
    let observer: IntersectionObserver | null = null
    const currentRef = ref.current

    if (currentRef) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
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

      observer.observe(currentRef)
    }

    return () => {
      if (currentRef && observer) {
        observer.unobserve(currentRef)
      }
    }
  }, [delay, once, threshold, hasAnimated, disabled])

  // Simplified animation variants with reduced intensity
  const getAnimationVariants = () => {
    const distance = isMobile ? 10 : 20 // Reduce animation distance on mobile

    switch (variant) {
      case "fade-up":
        return {
          hidden: { opacity: 0, y: distance },
          visible: { opacity: 1, y: 0 },
        }
      case "fade-down":
        return {
          hidden: { opacity: 0, y: -distance },
          visible: { opacity: 1, y: 0 },
        }
      case "fade-left":
        return {
          hidden: { opacity: 0, x: -distance },
          visible: { opacity: 1, x: 0 },
        }
      case "fade-right":
        return {
          hidden: { opacity: 0, x: distance },
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
          hidden: { opacity: 0, rotateX: 5 }, // Reduced rotation
          visible: { opacity: 1, rotateX: 0 },
        }
      case "flip-down":
        return {
          hidden: { opacity: 0, rotateX: -5 }, // Reduced rotation
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
      transition={{
        duration: actualDuration,
        ease: "easeOut",
        // Reduce spring physics for better performance
        type: isMobile ? "tween" : "spring",
        damping: 25,
        stiffness: 100,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
