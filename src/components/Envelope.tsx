"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

interface EnvelopeProps {
  onOpen: () => void;
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative cursor-pointer transition-transform duration-500 hover:scale-105 active:scale-95 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpen}
    >
      {/* Decorative floating hearts around the envelope */}
      <div className="absolute -top-12 -right-8 animate-float opacity-70">
        <Heart className="w-8 h-8 text-valentine-red fill-current" />
      </div>
      <div className="absolute -bottom-8 -left-12 animate-float [animation-delay:1s] opacity-60">
        <Heart className="w-6 h-6 text-valentine-pink fill-current" />
      </div>

      {/* Main Envelope Body */}
      <div className="relative w-72 h-48 md:w-96 md:h-64 bg-valentine-pink/20 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(255,133,162,0.3)] border border-white/40 overflow-hidden preserve-3d">
        {/* Envelope Flap (Top) */}
        <div
          className={`absolute top-0 left-0 w-full h-1/2 bg-linear-to-br from-valentine-pink to-valentine-red shadow-lg origin-top transition-transform duration-700 ease-in-out z-30 ${isHovered ? "rotate-x-180" : "rotate-x-0"}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Heart Seal on Flap */}
          <div className="absolute inset-x-0 bottom-0 translate-y-1/2 flex justify-center z-40">
            <div
              className={`w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-500 ${isHovered ? "scale-0" : "scale-100"}`}
            >
              <Heart className="w-6 h-6 text-valentine-red fill-current animate-pulse" />
            </div>
          </div>
        </div>

        {/* Envelope Content (The Letter peek) */}
        <div className="absolute inset-x-4 bottom-4 h-full bg-white/90 rounded-t-xl transition-transform duration-500 translate-y-12 group-hover:translate-y-4 z-10 shadow-inner p-6 flex flex-col items-center">
          <div className="w-full h-1 bg-valentine-pink/20 mb-4 rounded-full" />
          <div className="w-3/4 h-1 bg-valentine-pink/20 mb-4 rounded-full" />
          <div className="w-1/2 h-1 bg-valentine-pink/20 mb-4 rounded-full" />
        </div>

        {/* Static Bottom Part of Envelope */}
        <div className="absolute inset-0 bg-linear-to-t from-valentine-pink/40 to-transparent z-20 pointer-events-none" />

        {/* Call to Action Text */}
        <div className="absolute bottom-6 inset-x-0 text-center z-40">
          <p className="text-valentine-dark font-romantic text-lg md:text-xl font-bold animate-pulse">
            Haz clic para abrir con amor
          </p>
          <p className="text-valentine-red/80 text-xs md:text-sm font-medium mt-1">
            Algo especial te espera...
          </p>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 bg-valentine-pink blur-3xl opacity-20 -z-10 group-hover:opacity-40 transition-opacity" />
    </div>
  );
}
