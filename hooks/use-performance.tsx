"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type DevicePerformance = "low" | "medium" | "high"

interface PerformanceContextType {
  devicePerformance: DevicePerformance
  isLowEndDevice: boolean
  prefersReducedMotion: boolean
}

const PerformanceContext = createContext<PerformanceContextType>({
  devicePerformance: "medium",
  isLowEndDevice: false,
  prefersReducedMotion: false,
})

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const [devicePerformance, setDevicePerformance] = useState<DevicePerformance>("medium")
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(motionQuery.matches)

    // Listen for changes to motion preference
    const updateMotionPreference = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    motionQuery.addEventListener("change", updateMotionPreference)

    // Detect device performance
    const detectPerformance = () => {
      // Check if it's a mobile device
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

      // Check if it's a low-end device based on memory (if available)
      const isLowMemory = navigator.deviceMemory !== undefined && (navigator.deviceMemory as number) < 4

      // Check screen size as another indicator
      const isSmallScreen = window.innerWidth < 768

      // Check for older browsers/devices
      const isOlderBrowser = !("IntersectionObserver" in window) || !("requestAnimationFrame" in window)

      // Check for low CPU cores (if available)
      const isLowCPU = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < 4

      // Performance timing API check
      let isSlowDevice = false
      if (window.performance && window.performance.timing) {
        const navTiming = window.performance.timing
        const pageLoadTime = navTiming.domComplete - navTiming.navigationStart
        isSlowDevice = pageLoadTime > 3000 // If page load took more than 3 seconds
      }

      // Determine overall performance level
      const lowEndFactors = [isLowMemory, isOlderBrowser, isLowCPU, isSlowDevice].filter(Boolean).length

      if ((isMobile && (isLowMemory || isOlderBrowser)) || lowEndFactors >= 2 || prefersReducedMotion) {
        setIsLowEndDevice(true)
        return "low"
      } else if (isMobile || isSmallScreen || lowEndFactors === 1) {
        return "medium"
      }
      return "high"
    }

    setDevicePerformance(detectPerformance() as DevicePerformance)

    // Cleanup
    return () => {
      motionQuery.removeEventListener("change", updateMotionPreference)
    }
  }, [prefersReducedMotion])

  return (
    <PerformanceContext.Provider value={{ devicePerformance, isLowEndDevice, prefersReducedMotion }}>
      {children}
    </PerformanceContext.Provider>
  )
}

export function usePerformance() {
  return useContext(PerformanceContext)
}
