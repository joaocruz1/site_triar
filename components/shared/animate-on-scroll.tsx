"use client"

import { useEffect, useRef, useState, type ReactNode, useMemo } from "react"
import { cn } from "@/lib/utils"
import { motion, useReducedMotion } from "framer-motion"

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
  mobileOptimized?: boolean
}

// Variantes pré-definidas para evitar recálculos
const animationVariants = {
  "fade-up": { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
  "fade-down": { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } },
  "fade-left": { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } },
  "fade-right": { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } },
  "zoom-in": { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } },
  "zoom-out": { hidden: { opacity: 0, scale: 1.05 }, visible: { opacity: 1, scale: 1 } },
  "flip-up": { hidden: { opacity: 0, rotateX: 10 }, visible: { opacity: 1, rotateX: 0 } },
  "flip-down": { hidden: { opacity: 0, rotateX: -10 }, visible: { opacity: 1, rotateX: 0 } },
  // Variantes otimizadas para mobile (mais sutis)
  "mobile-fade-up": { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } },
  "mobile-fade-down": { hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } },
  "mobile-fade-left": { hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } },
  "mobile-fade-right": { hidden: { opacity: 0, x: 10 }, visible: { opacity: 1, x: 0 } },
  "mobile-zoom-in": { hidden: { opacity: 0, scale: 0.98 }, visible: { opacity: 1, scale: 1 } },
  "mobile-zoom-out": { hidden: { opacity: 0, scale: 1.02 }, visible: { opacity: 1, scale: 1 } },
  "mobile-flip-up": { hidden: { opacity: 0, rotateX: 5 }, visible: { opacity: 1, rotateX: 0 } },
  "mobile-flip-down": { hidden: { opacity: 0, rotateX: -5 }, visible: { opacity: 1, rotateX: 0 } },
}

export default function AnimateOnScroll({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  threshold = 0.1,
  duration = 0.6,
  once = true,
  mobileOptimized = true,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  // Detectar dispositivo móvel apenas uma vez no cliente
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Verificar imediatamente
    checkMobile()

    // Adicionar listener para redimensionamento, com debounce
    let timeoutId: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(checkMobile, 100)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(timeoutId)
    }
  }, [])

  // Otimização: usar useMemo para evitar recálculos desnecessários
  const observerOptions = useMemo(
    () => ({
      threshold,
      // Ajustar rootMargin para dispositivos móveis
      rootMargin: isMobile ? "0px 0px -50px 0px" : "0px 0px -100px 0px",
    }),
    [threshold, isMobile],
  )

  useEffect(() => {
    if (hasAnimated && once) return

    // Usar um ID para o timeout para limpeza adequada
    let timeoutId: NodeJS.Timeout

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Limpar qualquer timeout pendente
          if (timeoutId) clearTimeout(timeoutId)

          // Configurar novo timeout com o delay
          timeoutId = setTimeout(() => {
            setIsVisible(true)
            if (once) setHasAnimated(true)
          }, delay)
        } else if (!once && !hasAnimated) {
          setIsVisible(false)
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersection, observerOptions)

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (currentRef) observer.unobserve(currentRef)
      observer.disconnect()
    }
  }, [delay, once, hasAnimated, observerOptions])

  // Se o usuário preferir movimento reduzido, não animar
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  // Selecionar variante apropriada com base no dispositivo
  const selectedVariant = useMemo(() => {
    if (isMobile && mobileOptimized) {
      return animationVariants[`mobile-${variant}`] || animationVariants[variant]
    }
    return animationVariants[variant]
  }, [variant, isMobile, mobileOptimized])

  // Ajustar duração para dispositivos móveis
  const adjustedDuration = isMobile && mobileOptimized ? Math.min(duration, 0.4) : duration

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible || hasAnimated ? "visible" : "hidden"}
      variants={selectedVariant}
      transition={{
        duration: adjustedDuration,
        ease: "easeOut",
        // Usar aceleração de hardware
        type: "tween",
      }}
      className={cn(className)}
      style={{
        // Otimizações de renderização
        willChange: "opacity, transform",
        backfaceVisibility: "hidden",
        perspective: "1000px",
        // Forçar aceleração de hardware
        transform: "translateZ(0)",
      }}
    >
      {children}
    </motion.div>
  )
}
