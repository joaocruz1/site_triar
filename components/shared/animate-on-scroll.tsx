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
  disabled?: boolean
  mobileOptimized?: boolean // Nova prop para otimização específica para mobile
}

export default function AnimateOnScroll({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  threshold = 0.1,
  duration = 0.6,
  once = true,
  disabled = false,
  mobileOptimized = true, // Ativado por padrão
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Verificação otimizada para mobile
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    // Verificação do viewport apenas no client-side
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Verificação inicial
    checkIfMobile()
    
    // Opcional: listener para redimensionamento
    const resizeListener = () => {
      checkIfMobile()
    }
    
    window.addEventListener('resize', resizeListener)
    return () => window.removeEventListener('resize', resizeListener)
  }, [])

  // Pular toda a lógica de animação se estiver desabilitado
  if (disabled) {
    return <div className={className}>{children}</div>
  }

  useEffect(() => {
    if (!ref.current) return

    // Otimização: usar IntersectionObserver apenas se necessário
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Usar requestAnimationFrame para melhor performance
            requestAnimationFrame(() => {
              setTimeout(() => {
                setIsVisible(true)
                if (once) setHasAnimated(true)
              }, delay)
            })
          } else if (!once && !hasAnimated) {
            setIsVisible(false)
          }
        })
      },
      {
        threshold,
        rootMargin: isMobile ? "0px 0px -50px 0px" : "0px 0px -100px 0px", // Menos margem no mobile
      }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay, once, threshold, hasAnimated, isMobile])

  // Obter variantes otimizados para mobile
  const getAnimationVariants = () => {
    // Reduzir drasticamente efeitos no mobile quando otimizado
    if (mobileOptimized && isMobile) {
      return {
        hidden: { opacity: 0, y: 5 }, // Movimento mínimo
        visible: { opacity: 1, y: 0 },
      }
    }

    const distance = isMobile ? 15 : 25

    switch (variant) {
      case "fade-up":
        return { hidden: { opacity: 0, y: distance }, visible: { opacity: 1, y: 0 } }
      case "fade-down":
        return { hidden: { opacity: 0, y: -distance }, visible: { opacity: 1, y: 0 } }
      case "fade-left":
        return { hidden: { opacity: 0, x: -distance }, visible: { opacity: 1, x: 0 } }
      case "fade-right":
        return { hidden: { opacity: 0, x: distance }, visible: { opacity: 1, x: 0 } }
      case "zoom-in":
        return { hidden: { opacity: 0, scale: 0.98 }, visible: { opacity: 1, scale: 1 } } // Zoom mais suave
      case "zoom-out":
        return { hidden: { opacity: 0, scale: 1.02 }, visible: { opacity: 1, scale: 1 } } // Zoom mais suave
      case "flip-up":
        return { hidden: { opacity: 0, rotateX: 3 }, visible: { opacity: 1, rotateX: 0 } }
      case "flip-down":
        return { hidden: { opacity: 0, rotateX: -3 }, visible: { opacity: 1, rotateX: 0 } }
      default:
        return { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    }
  }

  const variants = getAnimationVariants()

  // Configuração de transição otimizada
  const transition = {
    duration: isMobile ? Math.min(duration, 0.3) : duration, // Duração menor no mobile
    ease: "easeOut",
    type: "tween", // Sempre usar tween para melhor performance
    ...(isMobile ? {} : { damping: 20, stiffness: 100 }), // Apenas spring no desktop
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible || hasAnimated ? "visible" : "hidden"}
      variants={variants}
      transition={transition}
      className={cn(className)}
      // Otimização: reduzir recálculos de estilo
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  )
}