'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, Heart } from 'lucide-react'
import YouTube from 'react-youtube'

export default function YouTubeMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(0.3)
  const [isReady, setIsReady] = useState(false)
  const playerRef = useRef<any>(null)

  const videoId = 'snFhcHHdzT0' // Reik - Creo en Ti

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      enablejsapi: 1,
      fs: 0,
      loop: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3,
      start: 0,
      volume: volume * 100
    }
  }

  const onReady = (event: any) => {
    playerRef.current = event.target
    setIsReady(true)
    
    // Iniciar reproducción automática
    setTimeout(() => {
      if (playerRef.current) {
        playerRef.current.playVideo()
        setIsPlaying(true)
      }
    }, 1000)
  }

  const onStateChange = (event: any) => {
    const playerState = event.data
    
    switch (playerState) {
      case -1: // Unstarted
        setIsPlaying(false)
        break
      case 0: // Ended
        if (playerRef.current) {
          playerRef.current.playVideo() // Loop
        }
        setIsPlaying(false)
        break
      case 1: // Playing
        setIsPlaying(true)
        break
      case 2: // Paused
        setIsPlaying(false)
        break
      case 3: // Buffering
        setIsPlaying(false)
        break
      case 5: // Video Cued
        setIsPlaying(false)
        break
    }
  }

  const togglePlay = () => {
    if (!playerRef.current || !isReady) return

    if (isPlaying) {
      playerRef.current.pauseVideo()
    } else {
      playerRef.current.playVideo()
    }
  }

  useEffect(() => {
    if (playerRef.current && isReady) {
      playerRef.current.setVolume(volume * 100)
    }
  }, [volume, isReady])

  return (
    <>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
        style={{ display: 'none' }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
      >
        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <motion.button
            onClick={togglePlay}
            disabled={!isReady}
            className="p-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
            whileHover={{ scale: isReady ? 1.1 : 1 }}
            whileTap={{ scale: isReady ? 0.9 : 1 }}
          >
            {!isReady ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </motion.button>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-gray-600" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
          </div>

          {/* Animated Heart */}
          {isPlaying && isReady && (
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-4 h-4 text-pink-500" fill="currentColor" />
            </motion.div>
          )}
        </div>

        {/* Music Info */}
        <div className="mt-2 text-center">
          <p className="text-xs text-gray-600 font-medium">Reik - Creo en Ti</p>
          <p className="text-xs text-gray-500">Para nuestro momento especial 💕</p>
          {!isReady && (
            <p className="text-xs text-yellow-600 mt-1">Cargando música...</p>
          )}
        </div>
      </motion.div>
    </>
  )
}