"use client"

import type React from "react"

import { useState, useRef, type ReactNode, useEffect } from "react"
import { motion } from "framer-motion"

interface ThreeDCardProps {
  children: ReactNode
  className?: string
  glareColor?: string
  depth?: number
  disabled?: boolean // Add option to disable 3D effect
}

export default function ThreeDCard({
  children,
  className = "",
  glareColor = "rgba(0, 167, 225, 0.1)",
  depth = 10,
  disabled = false, // Default to enabled
}: ThreeDCardProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  // Check if we should disable 3D effects
  const [shouldDisable, setShouldDisable] = useState(disabled)

  useEffect(() => {
    // Check if we're on mobile or if reduced motion is preferred
    const isMobile = window.innerWidth < 768
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setShouldDisable(disabled || isMobile || prefersReducedMotion)
  }, [disabled])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldDisable || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX
    const mouseY = e.clientY

    // Significantly reduce the intensity of the rotation
    const rotateY = ((mouseX - centerX) / (rect.width / 2)) * (depth * 0.4)
    const rotateX = ((centerY - mouseY) / (rect.height / 2)) * (depth * 0.4)

    // Calculate glare position
    const glareX = ((mouseX - rect.left) / rect.width) * 100
    const glareY = ((mouseY - rect.top) / rect.height) * 100

    setRotateX(rotateX)
    setRotateY(rotateY)
    setGlarePosition({ x: glareX, y: glareY })
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  // If 3D effect is disabled, just render children
  if (shouldDisable) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 150, // Reduced stiffness
        damping: 30, // Increased damping
        mass: 0.8,
      }}
    >
      {children}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${glareColor} 0%, rgba(255,255,255,0) 70%)`,
          opacity: Math.abs(rotateX) + Math.abs(rotateY) > 0 ? 0.5 : 0, // Reduced opacity
          transition: "opacity 0.3s ease",
        }}
      />
    </motion.div>
  )
}
