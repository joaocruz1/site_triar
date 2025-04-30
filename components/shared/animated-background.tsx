"use client"

import { useEffect, useRef } from "react"

interface AnimatedBackgroundProps {
  color?: string
  speed?: number
  density?: number
  className?: string
}

export default function AnimatedBackground({
  color = "#00A7E1",
  speed = 0.5,
  density = 50,
  className = "",
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
      // Definir a largura e altura exatas da janela para evitar overflow
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particles = []
      // Reduzir a densidade para melhorar a performance
      const particleCount = Math.floor((canvas.width * canvas.height) / (40000 / density))

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5, // Reduzir o tamanho das partículas
          speedX: (Math.random() - 0.5) * speed * 0.5, // Reduzir a velocidade
          speedY: (Math.random() - 0.5) * speed * 0.5, // Reduzir a velocidade
          opacity: Math.random() * 0.4 + 0.1, // Reduzir a opacidade
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

      // Draw connections - reduzir o número de conexões para melhorar a performance
      ctx.strokeStyle = color.replace(")", ", 0.05)") // Reduzir a opacidade das linhas
      ctx.lineWidth = 0.2

      // Limitar o número de conexões verificadas
      const connectionDistance = 80 // Reduzir a distância de conexão
      const maxConnections = 3 // Limitar o número de conexões por partícula

      for (let i = 0; i < particles.length; i++) {
        let connections = 0
        for (let j = i + 1; j < particles.length && connections < maxConnections; j++) {
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

      animationFrameId = requestAnimationFrame(drawParticles)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    drawParticles()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [color, speed, density])

  // Modificar a classe do canvas para evitar overflow
  return <canvas ref={canvasRef} className={`fixed inset-0 -z-10 max-w-full overflow-hidden ${className}`} />
}
