"use client"

import { useState, useEffect } from "react"

export default function useMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    // Throttle function for better performance
    const throttle = (fn: Function, delay: number) => {
      let lastCall = 0
      return (...args: any[]) => {
        const now = Date.now()
        if (now - lastCall < delay) return
        lastCall = now
        return fn(...args)
      }
    }

    const checkDevice = throttle(() => {
      const width = window.innerWidth
      setIsMobile(width < 640)
      setIsTablet(width >= 640 && width < 1024)
      setIsDesktop(width >= 1024)
    }, 200)

    checkDevice()
    window.addEventListener("resize", checkDevice)
    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  return { isMobile, isTablet, isDesktop }
}
