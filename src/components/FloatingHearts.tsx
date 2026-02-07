"use client";

import { useEffect, useState, memo } from "react";
import { Heart } from "lucide-react";

interface FloatingHeart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

const HeartIcon = memo(({ heart }: { heart: FloatingHeart }) => (
  <div
    className="absolute bottom-0 animate-rise"
    style={{
      left: `${heart.left}%`,
      animationDuration: `${heart.duration}s`,
      animationDelay: `${heart.delay}s`,
    }}
  >
    <Heart
      size={heart.size}
      className="text-valentine-pink/40 fill-current"
      style={{
        filter: "blur(0.5px)",
      }}
    />
  </div>
));

HeartIcon.displayName = "HeartIcon";

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const newHearts: FloatingHeart[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <HeartIcon key={heart.id} heart={heart} />
      ))}
    </div>
  );
}
