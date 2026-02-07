"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Envelope from "@/components/Envelope";
import TypewriterText from "@/components/TypewriterText";
import AcceptButton from "@/components/AcceptButton";
import FloatingHearts from "@/components/FloatingHearts";
import CountDownTimer from "@/components/CountDownTimer";
import ConfettiExplosion from "@/components/ConfettiExplosion";
import MapComponent from "@/components/MapComponent";
import FlowersAnimation from "@/components/FlowersAnimation";
import { useMusic } from "@/components/MusicProvider";

export default function Home() {
  const router = useRouter();
  const { trigger: triggerMusic } = useMusic();
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showAcceptButton, setShowAcceptButton] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFlowers, setShowFlowers] = useState(false);

  const invitationData = {
    name: "Dan Jhosss",
    message: `Sin darme cuenta, empezaste a ocupar un lugar bonito en mis pensamientos. En lo simple, en lo cotidiano, en esos momentos que no se planean.\n\nJhosss, hay algo en ti que hace que compartir tiempo se sienta natural y especial.`,
    invitation: `Mi Amor, ¿te gustaría compartir conmigo un 14 de febrero especial?`,
    location: "Chincheros, Apurímac, Perú",
    date: "2026-02-14T19:00:00",
  };

  const handleEnvelopeOpen = () => {
    setIsEnvelopeOpen(true);
    triggerMusic();
    setTimeout(() => setShowAcceptButton(true), 3000);
  };

  const handleAccept = () => {
    setAccepted(true);
    setShowConfetti(true);
    setShowFlowers(true);
    // Redirigir a galería después de un momento para ver los efectos
    setTimeout(() => router.push("/gallery"), 8000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-sans">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-valentine-pink/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-valentine-red/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>

      {/* Floating hearts animation component */}
      <FloatingHearts />

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 md:px-8">
        {!isEnvelopeOpen ? (
          <div className="animate-fade-in-up">
            <Envelope onOpen={handleEnvelopeOpen} />
          </div>
        ) : (
          <div className="w-full max-w-2xl flex flex-col items-center space-y-8 animate-fade-in-up">
            {/* Romantic Letter Section */}
            <div className="w-full glass rounded-3xl p-6 md:p-10 shadow-2xl relative">
              <div className="absolute -top-6 -left-4 w-12 h-12 bg-valentine-red rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <span className="text-white text-2xl">💖</span>
              </div>

              <TypewriterText
                text={invitationData.message}
                className="text-xl md:text-2xl text-valentine-dark leading-relaxed font-romantic text-center"
              />
            </div>

            {/* Invitation Reveal */}
            {showAcceptButton && (
              <div className="w-full animate-fade-in-up space-y-8 text-center bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-valentine-pink/30 shadow-xl">
                <p className="text-2xl md:text-3xl text-valentine-dark font-romantic font-bold">
                  {invitationData.invitation}
                </p>

                <AcceptButton onAccept={handleAccept} />

                {/* Countdown display */}
                <div className="pt-4">
                  <CountDownTimer targetDate={invitationData.date} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Confetti and Flowers */}
        <ConfettiExplosion trigger={showConfetti} />
        <FlowersAnimation trigger={showFlowers} />

        {/* Post-Acceptance Content (Map) */}
        {/* {accepted && (
          <div className="mt-12 w-full max-w-2xl animate-fade-in-up">
            <div className="glass rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50">
              <MapComponent location={invitationData.location} />
            </div>
            <p className="text-center mt-4 text-valentine-dark font-medium italic">
              ¡Te espero en este lugar especial! ✨
            </p>
          </div>
        )} */}
      </main>
    </div>
  );
}
