'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

interface FloatingHeart {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([])

  useEffect(() => {
    const generateHearts = () => {
      const newHearts: FloatingHeart[] = []
      for (let i = 0; i < 15; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100 + 100,
          size: Math.random() * 20 + 10,
          duration: Math.random() * 10 + 10,
          delay: Math.random() * 5
        })
      }
      setHearts(newHearts)
    }

    generateHearts()
    const interval = setInterval(generateHearts, 20000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          initial={{
            x: `${heart.x}%`,
            y: `${heart.y}%`,
            opacity: 0
          }}
          animate={{
            y: '-20vh',
            opacity: [0, 0.6, 0.2, 0],
            rotate: [0, 15, -15, 0]
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            left: `${heart.x}%`
          }}
        >
          <Heart
            size={heart.size}
            className="text-pink-300"
            fill="currentColor"
            style={{
              filter: 'blur(0.5px)'
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}