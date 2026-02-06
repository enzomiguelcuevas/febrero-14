'use client'

import { useState, useEffect } from 'react'

interface TypewriterTextProps {
  text: string
  className?: string
  speed?: number
  cursor?: boolean
}

export default function TypewriterText({ 
  text, 
  className = '', 
  speed = 50,
  cursor = true 
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  useEffect(() => {
    if (cursor) {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev)
      }, 500)

      return () => clearInterval(cursorInterval)
    }
  }, [cursor])

  return (
    <span className={className}>
      {displayedText}
      {cursor && (
        <span 
          className={`inline-block w-0.5 h-5 bg-current ml-1 transition-opacity duration-100 ${
            showCursor ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </span>
  )
}