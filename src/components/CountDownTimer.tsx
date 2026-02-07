"use client";

import { useState, useEffect, memo } from "react";
import { Calendar, Heart } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountDownTimerProps {
  targetDate: string;
}

const TimeUnit = memo(({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-col items-center">
    <div className="bg-white/50 backdrop-blur-md w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-lg border border-white/40 mb-2">
      <span className="text-2xl md:text-3xl font-bold text-valentine-red animate-pulse">
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-valentine-dark/60">
      {label}
    </span>
  </div>
));

TimeUnit.displayName = "TimeUnit";

export default function CountDownTimer({ targetDate }: CountDownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Calendar className="w-5 h-5 text-valentine-red" />
        <h3 className="text-xl font-bold text-valentine-dark">
          Faltan para nuestro día:
        </h3>
      </div>

      <div className="flex justify-center gap-4 md:gap-8">
        <TimeUnit label="Días" value={timeLeft.days} />
        <TimeUnit label="Horas" value={timeLeft.hours} />
        <TimeUnit label="Min" value={timeLeft.minutes} />
        <TimeUnit label="Seg" value={timeLeft.seconds} />
      </div>

      <div className="mt-8 flex justify-center">
        <div className="animate-heartbeat flex items-center gap-2 px-4 py-2 bg-valentine-pink/10 rounded-full border border-valentine-pink/20">
          <Heart className="w-4 h-4 text-valentine-red fill-current" />
          <span className="text-xs font-medium text-valentine-dark">
            14 de Febrero • Guardar Fecha
          </span>
        </div>
      </div>
    </div>
  );
}
