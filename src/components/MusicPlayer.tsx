"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, Heart, Music, Disc } from "lucide-react";

interface MusicPlayerProps {
  trigger?: boolean;
}

export default function MusicPlayer({ trigger }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [volume, setVolume] = useState(0.3);
  const [error, setError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasTriggeredRef = useRef(false);

  // Función para reproducir música
  const playMusic = useCallback(() => {
    if (audioRef.current && !hasTriggeredRef.current && !error) {
      hasTriggeredRef.current = true;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("No se pudo reproducir:", err);
          setIsLoading(false);
        });
    }
  }, [error]);

  // Efecto para reproducir cuando trigger cambia a true
  useEffect(() => {
    if (trigger && !hasTriggeredRef.current) {
      playMusic();
    }
  }, [trigger, playMusic]);

  useEffect(() => {
    audioRef.current = new Audio("/music/song1.mp3");
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = true;

      audioRef.current.oncanplaythrough = () => {
        setIsLoading(false);
      };

      audioRef.current.onerror = () => {
        setError(true);
        setIsLoading(false);
      };

      // Eventos para sincronizar estado con el audio
      audioRef.current.onplay = () => setIsPlaying(true);
      audioRef.current.onpause = () => setIsPlaying(false);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current || error) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.log("Error reproduciendo:", err);
      });
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 z-50 w-full border-b border-pink-100 bg-white px-4 py-3"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-gray-700 font-semibold flex items-center gap-2">
            <Music className="w-4 h-4" />
            Nuestra canción
          </p>
          <p className="text-xs text-gray-500">
            Para nuestro momento especial 💕
          </p>
          {isLoading && (
            <p className="text-xs text-yellow-600 mt-1">Cargando música...</p>
          )}
          {error && (
            <p className="text-xs text-red-500 mt-1">Error cargando audio</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            onClick={togglePlay}
            disabled={isLoading || error}
            className="p-3 bg-linear-to-r from-pink-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 flex items-center justify-center"
            whileHover={{ scale: isLoading || error ? 1 : 1.1 }}
            whileTap={{ scale: isLoading || error ? 1 : 0.9 }}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : error ? (
              <Music className="w-4 h-4" />
            ) : isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </motion.button>

          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-gray-600" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
          </div>

          {isPlaying && !isLoading && !error && (
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Disc className="w-4 h-4 text-pink-500" />
            </motion.div>
          )}

          {isPlaying && !isLoading && !error && (
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-4 h-4 text-pink-500" fill="currentColor" />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
