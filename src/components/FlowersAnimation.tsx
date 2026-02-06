'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flower, FlowerAnimationProps } from '@/types/flower.types'

export default function FlowersAnimation({ trigger, onComplete }: FlowerAnimationProps) {
  const [flowers, setFlowers] = useState<Flower[]>([])

  useEffect(() => {
    if (trigger && flowers.length === 0) {
      const newFlowers: Flower[] = []
      
      // Generar 20 flores: 10 lirios, 10 rosas (50/50)
      for (let i = 0; i < 20; i++) {
        const isLily = i < 10
        newFlowers.push({
          id: i,
          type: isLily ? 'lily' : 'rose',
          x: Math.random() * 100,
          y: Math.random() * 50 - 20, // Empezar arriba o ligeramente visible
          size: Math.random() * 15 + 25, // 25-40px
          rotation: Math.random() * 360,
          duration: Math.random() * 2 + 4, // 4-6 segundos
          delay: Math.random() * 1.5, // 0-1.5s delay
          opacity: 0
        })
      }
      
      setFlowers(newFlowers)
      
      // Notificar completación
      if (onComplete) {
        setTimeout(onComplete, 7000) // 7s total
      }
    }
  }, [trigger, flowers.length, onComplete])

  if (!trigger) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      <AnimatePresence>
        {flowers.map((flower) => (
          <motion.div
            key={flower.id}
            className="absolute"
            initial={{
              x: `${flower.x}%`,
              y: `${flower.y}%`,
              opacity: 0,
              rotate: 0,
              scale: 0.5
            }}
            animate={{
              y: '110vh', // Caer más allá de la pantalla
              opacity: [0, 0.9, 0.9, 0],
              rotate: [0, flower.rotation + 180, flower.rotation + 360],
              scale: [0.5, 1, 1, 0.8]
            }}
            transition={{
              duration: flower.duration,
              delay: flower.delay,
              ease: [0.4, 0, 0.2, 1],
              times: [0, 0.1, 0.8, 1]
            }}
            style={{
              left: `${flower.x}%`,
              zIndex: Math.floor(Math.random() * 10) + 1
            }}
          >
            {/* Renderizar lirio o rosa según el tipo */}
            {flower.type === 'lily' ? (
              <div className="relative">
                <svg 
                  width={flower.size} 
                  height={flower.size} 
                  viewBox="0 0 40 40" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-lg"
                >
                  <defs>
                    <linearGradient id={`lilyGradient-${flower.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#FFFFFF', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#FFF8DC', stopOpacity:1}} />
                    </linearGradient>
                    <linearGradient id={`centerGradient-${flower.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#FFE4B5', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#DDA520', stopOpacity:1}} />
                    </linearGradient>
                  </defs>
                  
                  {/* Pétalos de lirio */}
                  <ellipse cx="20" cy="12" rx="3" ry="8" fill={`url(#lilyGradient-${flower.id})`} transform="rotate(0 20 20)" opacity="0.9"/>
                  <ellipse cx="20" cy="12" rx="3" ry="8" fill={`url(#lilyGradient-${flower.id})`} transform="rotate(60 20 20)" opacity="0.9"/>
                  <ellipse cx="20" cy="12" rx="3" ry="8" fill={`url(#lilyGradient-${flower.id})`} transform="rotate(120 20 20)" opacity="0.9"/>
                  <ellipse cx="20" cy="12" rx="3" ry="8" fill={`url(#lilyGradient-${flower.id})`} transform="rotate(180 20 20)" opacity="0.9"/>
                  <ellipse cx="20" cy="12" rx="3" ry="8" fill={`url(#lilyGradient-${flower.id})`} transform="rotate(240 20 20)" opacity="0.9"/>
                  <ellipse cx="20" cy="12" rx="3" ry="8" fill={`url(#lilyGradient-${flower.id})`} transform="rotate(300 20 20)" opacity="0.9"/>
                  
                  {/* Centro del lirio */}
                  <circle cx="20" cy="20" r="4" fill={`url(#centerGradient-${flower.id})`} />
                  <circle cx="18" cy="19" r="1" fill="#8B4513" opacity="0.7"/>
                  <circle cx="22" cy="19" r="1" fill="#8B4513" opacity="0.7"/>
                  <circle cx="20" cy="22" r="1" fill="#8B4513" opacity="0.7"/>
                  
                  {/* Tallo */}
                  <rect x="19" y="24" width="2" height="16" fill="#228B22" opacity="0.8"/>
                  <ellipse cx="20" cy="32" rx="4" ry="2" fill="#228B22" opacity="0.6"/>
                </svg>
              </div>
            ) : (
              <div className="relative">
                <svg 
                  width={flower.size} 
                  height={flower.size} 
                  viewBox="0 0 35 35" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-lg"
                >
                  <defs>
                    <radialGradient id={`roseGradient-${flower.id}`} cx="50%" cy="50%" r="50%">
                      <stop offset="0%" style={{stopColor:'#FFB6C1', stopOpacity:1}} />
                      <stop offset="70%" style={{stopColor:'#FF69B4', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#FF1493', stopOpacity:1}} />
                    </radialGradient>
                    <radialGradient id={`roseCenter-${flower.id}`} cx="50%" cy="50%" r="50%">
                      <stop offset="0%" style={{stopColor:'#DC143C', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#8B0000', stopOpacity:1}} />
                    </radialGradient>
                  </defs>
                  
                  {/* Pétalos de rosa */}
                  <circle cx="17.5" cy="10" r="8" fill={`url(#roseGradient-${flower.id})`} opacity="0.7"/>
                  <circle cx="10" cy="15" r="7" fill={`url(#roseGradient-${flower.id})`} opacity="0.8"/>
                  <circle cx="25" cy="15" r="7" fill={`url(#roseGradient-${flower.id})`} opacity="0.8"/>
                  <circle cx="17.5" cy="22" r="8" fill={`url(#roseGradient-${flower.id})`} opacity="0.7"/>
                  <circle cx="14" cy="10" r="6" fill={`url(#roseGradient-${flower.id})`} opacity="0.9"/>
                  <circle cx="21" cy="10" r="6" fill={`url(#roseGradient-${flower.id})`} opacity="0.9"/>
                  <circle cx="14" cy="20" r="6" fill={`url(#roseGradient-${flower.id})`} opacity="0.9"/>
                  <circle cx="21" cy="20" r="6" fill={`url(#roseGradient-${flower.id})`} opacity="0.9"/>
                  
                  {/* Centro de la rosa */}
                  <circle cx="17.5" cy="15" r="5" fill={`url(#roseCenter-${flower.id})`} />
                  
                  {/* Detalles del centro */}
                  <circle cx="16" cy="14" r="0.5" fill="#8B0000" opacity="0.8"/>
                  <circle cx="19" cy="14" r="0.5" fill="#8B0000" opacity="0.8"/>
                  <circle cx="17.5" cy="16.5" r="0.5" fill="#8B0000" opacity="0.8"/>
                  <circle cx="16.5" cy="15.5" r="0.5" fill="#8B0000" opacity="0.6"/>
                  <circle cx="18.5" cy="15.5" r="0.5" fill="#8B0000" opacity="0.6"/>
                  
                  {/* Tallo */}
                  <rect x="16.5" y="24" width="2" height="11" fill="#228B22" opacity="0.8"/>
                  <ellipse cx="17.5" cy="30" rx="3" ry="1.5" fill="#228B22" opacity="0.6"/>
                </svg>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}