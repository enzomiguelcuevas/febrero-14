"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Heart } from "lucide-react";

interface EnvelopeProps {
  onOpen: () => void;
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onOpen}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Envelope Body */}
      <div className="relative w-80 h-56 bg-linear-to-br from-pink-100 to-pink-200 rounded-lg shadow-2xl overflow-hidden">
        {/* Envelope Flap */}
        <motion.div
          className="absolute top-0 left-0 w-full h-32 bg-linear-to-br from-pink-200 to-pink-300 origin-top"
          animate={{
            rotateX: isHovered ? 180 : 0,
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Flap Design */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart
              className="w-12 h-12 text-pink-400 opacity-50"
              fill="currentColor"
            />
          </div>
        </motion.div>

        {/* Envelope Content */}
        <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center">
          <Mail className="w-8 h-8 text-pink-500 mb-2" />
          <p className="text-pink-600 font-medium text-sm">
            Abre la Invitacion Mi Amor
          </p>
          <p className="text-pink-500 text-xs mt-1">es muy especial</p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-2 right-2">
          <Heart className="w-4 h-4 text-pink-300" fill="currentColor" />
        </div>
        <div className="absolute bottom-2 left-2">
          <Heart className="w-4 h-4 text-pink-300" fill="currentColor" />
        </div>
      </div>

      {/* Floating Animation */}
      <motion.div
        className="absolute -top-4 -right-4"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Heart
          className="w-6 h-6 text-pink-400 opacity-60"
          fill="currentColor"
        />
      </motion.div>

      <motion.div
        className="absolute -bottom-4 -left-4"
        animate={{
          y: [0, -8, 0],
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <Heart
          className="w-5 h-5 text-pink-300 opacity-50"
          fill="currentColor"
        />
      </motion.div>
    </motion.div>
  );
}
