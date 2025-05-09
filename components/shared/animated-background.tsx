"use client"

import { useEffect, useRef } from "react"

interface AnimatedBackgroundProps {
  color?: string
  speed?: number
  density?: number
  className?: string
  disabled?: boolean // Add option to disable
}

export default function AnimatedBackground({
  color = "#00A7E1",
  speed = 0.5,
  density = 50,
  className = "",
  disabled = false, // Default to enabled
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // If disabled or on mobile, return an empty div with just the background color
  if (disabled || (typeof window !== "undefined" && window.innerWidth < 768)) {
    return (
      <div className={`fixed inset-0 -z-10 ${className}`} style={{ backgroundColor: color.replace(")", ", 0.03)") }} />
    )
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Array<{
      x: number
      y: number
      radius: number
      speedX: number
      speedY: number
      opacity: number
    }> = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particles = []
      // Significantly reduce particle count for better performance
      const particleCount = Math.floor((canvas.width * canvas.height) / (80000 / Math.min(density, 25)))

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1 + 0.5, // Smaller particles
          speedX: (Math.random() - 0.5) * speed * 0.3, // Slower movement
          speedY: (Math.random() - 0.5) * speed * 0.3, // Slower movement
          opacity: Math.random() * 0.3 + 0.1, // Lower opacity
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = color.replace(")", `, ${particle.opacity})`)
        ctx.fill()

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY
        }
      })

      // Draw connections - drastically reduce connections for performance
      ctx.strokeStyle = color.replace(")", ", 0.03)") // Much lower opacity
      ctx.lineWidth = 0.2

      // Limit connections to very few
      const connectionDistance = 60
      const maxConnections = 2 // Limit connections per particle

      // Only check every 3rd particle to reduce calculations
      for (let i = 0; i < particles.length; i += 3) {
        let connections = 0
        for (let j = i + 3; j < particles.length && connections < maxConnections; j += 3) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            connections++
          }
        }
      }

      // Reduce animation frame rate for better performance
      // Only request animation frame every other frame
      setTimeout(() => {
        animationFrameId = requestAnimationFrame(drawParticles)
      }, 30) // Limit to ~30fps
    }

    resizeCanvas()

    // Throttle resize event
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 200)
    }

    window.addEventListener("resize", handleResize)
    drawParticles()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [color, speed, density, disabled])

  return <canvas ref={canvasRef} className={`fixed inset-0 -z-10 ${className}`} />
}
