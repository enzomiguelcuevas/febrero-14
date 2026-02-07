"use client";

import { useState, useEffect, memo } from "react";
import { Flower, FlowerAnimationProps } from "@/types/flower.types";

const FlowerSvg = memo(({ flower }: { flower: Flower }) => {
  const isLily = flower.type === "lily";

  return (
    <div
      className="absolute animate-fall"
      style={{
        left: `${flower.x}%`,
        animationDuration: `${flower.duration}s`,
        animationDelay: `${flower.delay}s`,
        zIndex: Math.floor(flower.size),
      }}
    >
      {isLily ? (
        <svg
          width={flower.size}
          height={flower.size}
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          <defs>
            <linearGradient
              id={`lilyGradient-${flower.id}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#FFFFFF", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#FFF8DC", stopOpacity: 1 }}
              />
            </linearGradient>
            <linearGradient
              id={`centerGradient-${flower.id}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#FFE4B5", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#DDA520", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <ellipse
            cx="20"
            cy="12"
            rx="3"
            ry="8"
            fill={`url(#lilyGradient-${flower.id})`}
            transform="rotate(0 20 20)"
            opacity="0.9"
          />
          <ellipse
            cx="20"
            cy="12"
            rx="3"
            ry="8"
            fill={`url(#lilyGradient-${flower.id})`}
            transform="rotate(60 20 20)"
            opacity="0.9"
          />
          <ellipse
            cx="20"
            cy="12"
            rx="3"
            ry="8"
            fill={`url(#lilyGradient-${flower.id})`}
            transform="rotate(120 20 20)"
            opacity="0.9"
          />
          <ellipse
            cx="20"
            cy="12"
            rx="3"
            ry="8"
            fill={`url(#lilyGradient-${flower.id})`}
            transform="rotate(180 20 20)"
            opacity="0.9"
          />
          <ellipse
            cx="20"
            cy="12"
            rx="3"
            ry="8"
            fill={`url(#lilyGradient-${flower.id})`}
            transform="rotate(240 20 20)"
            opacity="0.9"
          />
          <ellipse
            cx="20"
            cy="12"
            rx="3"
            ry="8"
            fill={`url(#lilyGradient-${flower.id})`}
            transform="rotate(300 20 20)"
            opacity="0.9"
          />
          <circle
            cx="20"
            cy="20"
            r="4"
            fill={`url(#centerGradient-${flower.id})`}
          />
          <rect
            x="19"
            y="24"
            width="2"
            height="16"
            fill="#228B22"
            opacity="0.8"
          />
        </svg>
      ) : (
        <svg
          width={flower.size}
          height={flower.size}
          viewBox="0 0 35 35"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          <defs>
            <radialGradient
              id={`roseGradient-${flower.id}`}
              cx="50%"
              cy="50%"
              r="50%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#FFB6C1", stopOpacity: 1 }}
              />
              <stop
                offset="70%"
                style={{ stopColor: "#FF69B4", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#FF1493", stopOpacity: 1 }}
              />
            </radialGradient>
            <radialGradient
              id={`roseCenter-${flower.id}`}
              cx="50%"
              cy="50%"
              r="50%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#DC143C", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#8B0000", stopOpacity: 1 }}
              />
            </radialGradient>
          </defs>
          <circle
            cx="17.5"
            cy="10"
            r="8"
            fill={`url(#roseGradient-${flower.id})`}
            opacity="0.7"
          />
          <circle
            cx="10"
            cy="15"
            r="7"
            fill={`url(#roseGradient-${flower.id})`}
            opacity="0.8"
          />
          <circle
            cx="25"
            cy="15"
            r="7"
            fill={`url(#roseGradient-${flower.id})`}
            opacity="0.8"
          />
          <circle
            cx="17.5"
            cy="22"
            r="8"
            fill={`url(#roseGradient-${flower.id})`}
            opacity="0.7"
          />
          <circle
            cx="17.5"
            cy="15"
            r="5"
            fill={`url(#roseCenter-${flower.id})`}
          />
          <rect
            x="16.5"
            y="24"
            width="2"
            height="11"
            fill="#228B22"
            opacity="0.8"
          />
        </svg>
      )}
    </div>
  );
});

FlowerSvg.displayName = "FlowerSvg";

export default function FlowersAnimation({
  trigger,
  onComplete,
}: FlowerAnimationProps) {
  const [flowers, setFlowers] = useState<Flower[]>([]);

  useEffect(() => {
    if (trigger && flowers.length === 0) {
      const newFlowers: Flower[] = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        type: i % 2 === 0 ? "lily" : "rose",
        x: Math.random() * 100,
        y: -20,
        size: Math.random() * 15 + 30,
        rotation: Math.random() * 360,
        duration: Math.random() * 3 + 4,
        delay: Math.random() * 2,
        opacity: 0,
      }));

      setFlowers(newFlowers);

      if (onComplete) {
        setTimeout(onComplete, 8000);
      }
    }
  }, [trigger, flowers.length, onComplete]);

  if (!trigger) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      {flowers.map((flower) => (
        <FlowerSvg key={flower.id} flower={flower} />
      ))}
    </div>
  );
}
