"use client"

import type { ReactNode } from "react"
import { ParallaxProvider as ReactParallaxProvider } from "react-scroll-parallax"

export default function ParallaxProvider({ children }: { children: ReactNode }) {
  return (
    <ReactParallaxProvider>{children}</ReactParallaxProvider>
  )

}


