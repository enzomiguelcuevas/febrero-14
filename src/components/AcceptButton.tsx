"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, X } from "lucide-react";

interface AcceptButtonProps {
  onAccept: () => void;
}

export default function AcceptButton({ onAccept }: AcceptButtonProps) {
  const [showRejectModal, setShowRejectModal] = useState(false);

  const handleReject = () => {
    setShowRejectModal(true);
    setTimeout(() => setShowRejectModal(false), 3000);
  };

  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {/* Accept Button */}
        <motion.button
          onClick={onAccept}
          className="relative px-8 py-4 bg-linear-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full shadow-lg overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-pink-600 to-purple-600"
            initial={{ x: "-100%" }}
            whileHover={{ x: "0%" }}
            transition={{ duration: 0.3 }}
          />
          <div className="relative flex items-center gap-2">
            <Heart className="w-5 h-5" fill="currentColor" />
            <span>Sí, me encantaría 💕</span>
          </div>
        </motion.button>

        {/* Reject Button */}
        <motion.button
          onClick={handleReject}
          className="px-6 py-3 bg-gray-200 text-gray-600 font-medium rounded-full shadow hover:bg-gray-300 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-2">
            <X className="w-4 h-4" />
            <span>No gracias</span>
          </div>
        </motion.button>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-white rounded-lg shadow-xl p-4 max-w-xs">
            <div className="flex items-center gap-2 text-pink-600">
              <Heart className="w-4 h-4" fill="currentColor" />
              <p className="text-sm">¡Seguro te arrepentirás! 😉</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
