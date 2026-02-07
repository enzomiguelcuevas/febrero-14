"use client";

import { useState } from "react";
import { Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AcceptButtonProps {
  onAccept: () => void;
}

export default function AcceptButton({ onAccept }: AcceptButtonProps) {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

  const handleReject = () => {
    setShowRejectModal(true);
    setTimeout(() => setShowRejectModal(false), 3000);
  };

  const moveNoButton = () => {
    const x = Math.random() * 150 - 75;
    const y = Math.random() * 100 - 50;
    setNoButtonPos({ x, y });
  };

  return (
    <div className="relative w-full">
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        {/* Accept Button */}
        <Button
          size="lg"
          onClick={onAccept}
          className="relative px-12 py-8 bg-valentine-red hover:bg-valentine-red/90 text-white text-xl font-bold rounded-full shadow-[0_10px_30px_rgba(255,77,109,0.5)] transition-all duration-300 hover:scale-110 active:scale-95 animate-heartbeat group"
        >
          <div className="relative flex items-center gap-3">
            <Heart className="w-6 h-6 fill-current" />
            <span>¡Sí, acepto! 💕</span>
          </div>
        </Button>

        {/* Reject Button */}
        <div
          style={{
            transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
            transition: "transform 0.2s ease-out",
          }}
        >
          <Button
            variant="outline"
            size="lg"
            onMouseEnter={moveNoButton}
            onClick={handleReject}
            className="px-8 py-6 border-valentine-pink/30 text-valentine-dark/60 font-medium rounded-full hover:bg-valentine-pink/10 transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              <X className="w-4 h-4" />
              <span>No puedo...</span>
            </div>
          </Button>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="absolute top-full mt-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up w-max">
          <div className="glass rounded-2xl shadow-2xl p-6 border border-valentine-pink/30 max-w-xs text-center">
            <div className="flex flex-col items-center gap-3 text-valentine-red">
              <span className="text-4xl animate-bounce">🥺</span>
              <p className="text-sm font-bold leading-relaxed">
                ¿Segura que no quieres decir que sí? ¡Piénsalo bien, mi amor!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
