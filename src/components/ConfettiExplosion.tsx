"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface ConfettiExplosionProps {
  trigger: boolean;
}

export default function ConfettiExplosion({ trigger }: ConfettiExplosionProps) {
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (trigger && !hasTriggered.current) {
      hasTriggered.current = true;

      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const colors = ["#ff4d6d", "#ff85a2", "#ffb3c1", "#fff0f3", "#ff0000"];

      const heart = confetti.shapeFromText({ text: "❤️", scalar: 2 });

      const interval: NodeJS.Timeout = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          particleCount,
          spread: 70,
          origin: { y: 0.6 },
          colors: colors,
          shapes: [heart, "circle"],
          scalar: 1.2,
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [trigger]);

  return null;
}
