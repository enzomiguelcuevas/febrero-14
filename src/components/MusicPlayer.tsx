"use client";

import { useMusic } from "./MusicProvider";
import { Play, Pause, Volume2, Heart, Disc } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MusicPlayer() {
  const { isPlaying, togglePlay, volume, setVolume, isLoading } = useMusic();

  return (
    <div className="fixed bottom-6 left-0 right-0 z-200 px-4 animate-fade-in-up">
      <div className="bg-valentine-dark text-white max-w-lg mx-auto w-full rounded-2xl md:rounded-full px-6 py-4 flex flex-col md:flex-row items-center justify-between shadow-[0_10px_40px_rgba(89,13,34,0.6)] border border-valentine-red/20 gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-4 flex-1 min-w-0 w-full md:w-auto">
          <div
            className={`p-2 bg-valentine-red rounded-full shadow-lg shrink-0 ${isPlaying ? "animate-spin animation-duration-[3s]" : ""}`}
          >
            <Disc className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-valentine-cream truncate flex items-center gap-2">
              Nuestra Canción
              {isPlaying && (
                <Heart className="w-3 h-3 text-valentine-red animate-pulse fill-current" />
              )}
            </p>
            <p className="text-[10px] text-pink-300 font-medium uppercase tracking-widest truncate">
              {isLoading ? "Cargando el Amor..." : "Haciendo Magia ✨"}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-3 flex-1 md:flex-none">
            <Volume2 className="w-4 h-4 text-pink-300 shrink-0" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full md:w-24 h-1.5 bg-pink-900 rounded-lg appearance-none cursor-pointer accent-valentine-red"
            />
          </div>

          <Button
            size="icon-lg"
            variant="default"
            onClick={togglePlay}
            disabled={isLoading}
            className="bg-valentine-red hover:bg-valentine-red/90 text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all w-12 h-12"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current translate-x-0.5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
