'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Calendar, Heart } from 'lucide-react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountDownTimerProps {
  targetDate: string
}

export default function CountDownTimer({ targetDate }: CountDownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime()
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    const timer = setInterval(calculateTimeLeft, 1000)
    calculateTimeLeft()

    return () => clearInterval(timer)
  }, [targetDate])

  const timeUnits = [
    { label: 'Días', value: timeLeft.days, icon: Calendar },
    { label: 'Horas', value: timeLeft.hours, icon: Clock },
    { label: 'Minutos', value: timeLeft.minutes, icon: Clock },
    { label: 'Segundos', value: timeLeft.seconds, icon: Clock }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
    >
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
          Cuenta Regresiva
        </h3>
        <p className="text-gray-600 text-sm">Para un día especial 💕</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {timeUnits.map((unit, index) => {
          const Icon = unit.icon
          return (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="text-center"
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl p-3 mb-2">
                  <Icon className="w-5 h-5 text-pink-500 mx-auto mb-1" />
                  <motion.div
                    key={unit.value}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600"
                  >
                    {String(unit.value).padStart(2, '0')}
                  </motion.div>
                </div>
                <p className="text-xs md:text-sm text-gray-600 font-medium">
                  {unit.label}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        className="mt-4 text-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Heart className="w-4 h-4 text-pink-400 mx-auto" fill="currentColor" />
      </motion.div>
    </motion.div>
  )
}