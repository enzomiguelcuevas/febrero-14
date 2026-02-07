"use client";

import { useState, useEffect, memo } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  cursor?: boolean;
}

const TypewriterText = memo(
  ({
    text,
    className = "",
    speed = 40,
    cursor = true,
  }: TypewriterTextProps) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }, speed);

        return () => clearTimeout(timeout);
      }
    }, [currentIndex, text, speed]);

    return (
      <span className={`${className} inline-block`}>
        {displayedText}
        {cursor && (
          <span className="inline-block w-[3px] h-[1.2em] bg-valentine-red ml-1 align-middle animate-pulse" />
        )}
      </span>
    );
  },
);

TypewriterText.displayName = "TypewriterText";

export default TypewriterText;
