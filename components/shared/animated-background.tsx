"use client"

import { useEffect, useRef, useState } from "react"

declare global {
  interface Navigator {
    deviceMemory?: number;
  }
}

interface AnimatedBackgroundProps {
  color?: string
  secondaryColor?: string
  mode?: "particles" | "waves" | "gradient"
  speed?: number
  density?: number
  className?: string
  interactive?: boolean
}

export default function AnimatedBackground({
  color = "rgba(0, 167, 225, 0.8)",
  secondaryColor = "rgba(25, 91, 148, 0.6)",
  mode = "particles",
  speed = 1,
  density = 50,
  className = "",
  interactive = true,
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [devicePerformance, setDevicePerformance] = useState<"low" | "medium" | "high">("medium")

  useEffect(() => {
    setIsMounted(true)

    const detectPerformance = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isLowMemory = navigator.deviceMemory !== undefined && (navigator.deviceMemory as number) < 4;
      const isSmallScreen = window.innerWidth < 768;

      if (isMobile && (isLowMemory || isSmallScreen)) {
        return "low";
      } else if (isMobile || isSmallScreen) {
        return "medium";
      }
      return "high";
    }
    setDevicePerformance(detectPerformance())

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasDimensions()

    // Handle mouse movement for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove)
      canvas.addEventListener("mouseenter", handleMouseEnter)
      canvas.addEventListener("mouseleave", handleMouseLeave)
    }

    // Animation variables
    let animationFrameId: number
    let particles: any[] = []
    let waveTime = 0
    let gradientAngle = 0

    // Initialize particles
    const initializeParticles = () => {
      particles = []

      // Adjust density based on device performance and mode
      let adjustedDensity = density
      if (devicePerformance === "low") {
        adjustedDensity = density * 0.3
      } else if (devicePerformance === "medium") {
        adjustedDensity = density * 0.6
      }

      // Calculate particle count based on canvas size and density
      const baseCount = (canvas.width * canvas.height) / (40000 / adjustedDensity)
      const particleCount = Math.min(
        baseCount,
        devicePerformance === "low" ? 40 : devicePerformance === "medium" ? 80 : 150,
      )

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 3 + 1
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const directionX = (Math.random() - 0.5) * speed
        const directionY = (Math.random() - 0.5) * speed
        const opacity = Math.random() * 0.5 + 0.2
        const hue = Math.random() * 30 - 15 // Color variation

        particles.push({
          x,
          y,
          size,
          directionX,
          directionY,
          opacity,
          hue,
          originalSize: size,
          // For interactive effects
          baseDirectionX: directionX,
          baseDirectionY: directionY,
          // For pulsing effect
          pulseDirection: Math.random() > 0.5 ? 1 : -1,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulseSize: 0,
        })
      }
    }

    // Draw particles animation
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw each particle
      particles.forEach((particle, index) => {
        // Pulse size effect
        particle.pulseSize += particle.pulseSpeed * particle.pulseDirection
        if (particle.pulseSize > 0.5 || particle.pulseSize < -0.5) {
          particle.pulseDirection *= -1
        }

        const currentSize = particle.originalSize + particle.pulseSize

        // Interactive effect - particles respond to mouse
        if (interactive && isHovering) {
          const dx = mousePosition.x - particle.x
          const dy = mousePosition.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 150

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance
            particle.directionX = particle.baseDirectionX - dx * force * 0.02
            particle.directionY = particle.baseDirectionY - dy * force * 0.02
          } else {
            particle.directionX = particle.baseDirectionX
            particle.directionY = particle.baseDirectionY
          }
        }

        // Update position
        particle.x += particle.directionX
        particle.y += particle.directionY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        const particleColor = color.includes("rgba")
          ? color.replace(/[\d.]+\)$/, `${particle.opacity})`)
          : `hsla(${Number.parseInt(color.slice(1, 3), 16) + particle.hue}, 
             ${Number.parseInt(color.slice(3, 5), 16)}%, 
             ${Number.parseInt(color.slice(5, 7), 16)}%, 
             ${particle.opacity})`

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.fill()

        // Draw connections between particles (only for medium and high performance)
        if (devicePerformance !== "low") {
          const connectionDistance = devicePerformance === "medium" ? 100 : 150
          const maxConnections = devicePerformance === "medium" ? 3 : 5
          let connections = 0

          for (let j = index + 1; j < particles.length && connections < maxConnections; j++) {
            const otherParticle = particles[j]
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < connectionDistance) {
              const opacity = (1 - distance / connectionDistance) * 0.15
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = color.includes("rgba")
                ? color.replace(/[\d.]+\)$/, `${opacity})`)
                : `rgba(${Number.parseInt(color.slice(1, 3), 16)}, 
                   ${Number.parseInt(color.slice(3, 5), 16)}, 
                   ${Number.parseInt(color.slice(5, 7), 16)}, 
                   ${opacity})`
              ctx.stroke()
              connections++
            }
          }
        }
      })
    }

    // Draw waves animation
    const drawWaves = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, color)
      gradient.addColorStop(1, secondaryColor)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw multiple wave layers
      const waveCount = devicePerformance === "low" ? 2 : devicePerformance === "medium" ? 3 : 4
      const waveHeight = canvas.height / 15

      for (let i = 0; i < waveCount; i++) {
        const waveSpeed = (i + 1) * speed * 0.2
        const waveFrequency = (i + 1) * 0.5
        const waveOpacity = 0.1 - i * 0.02

        ctx.beginPath()
        ctx.moveTo(0, canvas.height / 2)

        for (let x = 0; x < canvas.width; x += 10) {
          const y = Math.sin(x * 0.01 * waveFrequency + waveTime * waveSpeed) * waveHeight + canvas.height / 2
          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()

        ctx.fillStyle = `rgba(255, 255, 255, ${waveOpacity})`
        ctx.fill()
      }

      waveTime += 0.01
    }

    // Draw animated gradient
    const drawGradient = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create rotating gradient
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.max(canvas.width, canvas.height)

      const x1 = centerX + Math.cos(gradientAngle) * radius
      const y1 = centerY + Math.sin(gradientAngle) * radius
      const x2 = centerX + Math.cos(gradientAngle + Math.PI) * radius
      const y2 = centerY + Math.sin(gradientAngle + Math.PI) * radius

      const gradient = ctx.createLinearGradient(x1, y1, x2, y2)
      gradient.addColorStop(0, color)
      gradient.addColorStop(1, secondaryColor)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add subtle noise texture
      if (devicePerformance !== "low") {
        const noiseCount = devicePerformance === "medium" ? 2000 : 5000

        for (let i = 0; i < noiseCount; i++) {
          const x = Math.random() * canvas.width
          const y = Math.random() * canvas.height
          const size = Math.random() * 1 + 0.5
          const opacity = Math.random() * 0.05

          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
          ctx.fill()
        }
      }

      gradientAngle += 0.001 * speed
    }

    // Main animation loop
    const animate = () => {
      // Choose animation based on mode
      if (mode === "particles") {
        drawParticles()
      } else if (mode === "waves") {
        drawWaves()
      } else if (mode === "gradient") {
        drawGradient()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    // Initialize and start animation
    window.addEventListener("resize", () => {
      setCanvasDimensions()
      initializeParticles()
    })

    initializeParticles()
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove)
        canvas.removeEventListener("mouseenter", handleMouseEnter)
        canvas.removeEventListener("mouseleave", handleMouseLeave)
      }
      cancelAnimationFrame(animationFrameId)
    }
  }, [color, secondaryColor, mode, speed, density, interactive, devicePerformance])

  // Don't render during SSR
  if (!isMounted) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ pointerEvents: interactive ? "auto" : "none" }}
    />
  )
}
