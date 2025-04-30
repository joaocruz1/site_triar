
"use client"

import React from "react"

import { useEffect } from "react"
import ReactDOM from "react-dom"
import ReactMarkdown from "react-markdown"

export function FixChatbotIssues() {
  useEffect(() => {
    // Check if required dependencies are loaded
    const checkDependencies = () => {
      const dependencies = [
        { name: "React", check: () => typeof React !== "undefined" },
        { name: "ReactDOM", check: () => typeof ReactDOM !== "undefined" },
        {
          name: "Framer Motion",
          check: () => typeof window !== "undefined" && window.hasOwnProperty("AnimatePresence"),
        },
        { name: "ReactMarkdown", check: () => typeof ReactMarkdown !== "undefined" },
      ]

      dependencies.forEach((dep) => {
        try {
          const isLoaded = dep.check()
          console.log(`${dep.name} is ${isLoaded ? "loaded" : "NOT loaded"}`)
        } catch (e) {
          console.log(`${dep.name} is NOT loaded`)
        }
      })
    }

    // Check for CSS conflicts
    const checkCssConflicts = () => {
      const chatbotElements = document.querySelectorAll(".chatbot-container")
      console.log(`Found ${chatbotElements.length} chatbot containers`)

      if (chatbotElements.length > 0) {
        const styles = window.getComputedStyle(chatbotElements[0])
        console.log("Chatbot container styles:", {
          position: styles.position,
          zIndex: styles.zIndex,
          fontFamily: styles.fontFamily,
        })
      }
    }

    // Run checks
    setTimeout(() => {
      console.log("--- Chatbot Diagnostics ---")
      checkDependencies()
      checkCssConflicts()
      console.log("-------------------------")
    }, 2000)
  }, [])

  return null
}
