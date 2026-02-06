'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Envelope from '@/components/Envelope'
import TypewriterText from '@/components/TypewriterText'
import AcceptButton from '@/components/AcceptButton'
import FloatingHearts from '@/components/FloatingHearts'
import CountDownTimer from '@/components/CountDownTimer'
import ConfettiExplosion from '@/components/ConfettiExplosion'
import MapComponent from '@/components/MapComponent'
import MusicPlayer from '@/components/MusicPlayer'
import FlowersAnimation from '@/components/FlowersAnimation'
import PhotoGallery from '@/components/PhotoGallery'

export default function Home() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)
  const [showAcceptButton, setShowAcceptButton] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showFlowers, setShowFlowers] = useState(false)
  const [showPhotoGallery, setShowPhotoGallery] = useState(false)
  const [musicTriggered, setMusicTriggered] = useState(false)

  const invitationData = {
    name: "Dan Jhosss",
    message: `Sin darme cuenta, empezaste a ocupar un lugar
    bonito en mis pensamientos. En lo simple, en lo cotidiano,
     en esos momentos que no se planean.Jhosss
      hay algo en ti que hace que compartir tiempo se sienta natural y especial.

Desde que apareciste, ${' Jhosss'}, todo tiene un brillo distinto.`,
    
    invitation: `Mi Amor,
¿Te gustaría compartir conmigo un 14 de febrero especial?
 Me haría mucha ilusión.`,
    
    location: "Urípa, Chincheros, Apurímac, Perú",
    date: "2026-02-14T19:00:00"
  }

  const handleEnvelopeOpen = () => {
    setIsEnvelopeOpen(true)
    setMusicTriggered(true)
    setTimeout(() => setShowAcceptButton(true), 4000)
  }

  const handleAccept = () => {
    setAccepted(true)
    setShowConfetti(true)
    setShowFlowers(true)
    // Mostrar galería después de 7 segundos (confeti + flores)
    setTimeout(() => setShowPhotoGallery(true), 7000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-amber-50 overflow-hidden relative">
      {/* Floating background hearts */}
      <FloatingHearts />
      
      {/* Music Player */}
      <MusicPlayer trigger={musicTriggered} />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <AnimatePresence mode="wait">
          {!isEnvelopeOpen ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <Envelope onOpen={handleEnvelopeOpen} />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl mx-auto text-center space-y-8"
            >
              {/* Romantic Message with Typewriter Effect */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                <TypewriterText 
                  text={invitationData.message}
                  className="text-lg md:text-xl text-gray-800 leading-relaxed font-light italic"
                />
              </div>

              {/* Invitation Message */}
              {showAcceptButton && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 shadow-lg"
                >
                  <p className="text-xl text-gray-700 mb-4">
                    {invitationData.invitation}
                  </p>
                  
                  {/* Accept Buttons */}
                  <AcceptButton onAccept={handleAccept} />
                </motion.div>
              )}

              {/* Countdown Timer */}
              <CountDownTimer targetDate={invitationData.date} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confetti Explosion */}
        <ConfettiExplosion trigger={showConfetti} />

        {/* Flowers Animation */}
        <FlowersAnimation trigger={showFlowers} />

        {/* Photo Gallery (shown after animations) */}
        {showPhotoGallery && (
          <PhotoGallery
            isVisible={showPhotoGallery}
            onBack={() => {
              setShowPhotoGallery(false)
              setShowFlowers(false)
              setShowConfetti(false)
              setAccepted(false)
            }}
          />
        )}

        {/* Location Details (shown after acceptance but before gallery) */}
        {accepted && !showPhotoGallery && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 max-w-2xl mx-auto w-full"
          >
            <MapComponent location={invitationData.location} />
          </motion.div>
        )}
      </div>
    </div>
  )
}
