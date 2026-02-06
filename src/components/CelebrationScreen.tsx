"use client";

import { useEffect, useState } from "react";
import Confetti from "./Confetti";

interface CelebrationScreenProps {
  fromName: string;
  toName: string;
  finalMessage?: string;
}

export default function CelebrationScreen({
  fromName,
  toName,
  finalMessage,
}: CelebrationScreenProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showYay, setShowYay] = useState(false);
  const [showSaidYes, setShowSaidYes] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    // Staggered reveal for dramatic effect
    const timers = [
      setTimeout(() => setShowConfetti(true), 100),
      setTimeout(() => setShowYay(true), 400),
      setTimeout(() => setShowSaidYes(true), 900),
      setTimeout(() => setShowMessage(true), 1400),
      setTimeout(() => setShowFooter(true), 1900),
    ];
    
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Confetti - starts first */}
      {showConfetti && <Confetti />}

      {/* Background hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-2xl sm:text-3xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {["💕", "💖", "💗", "❤️", "💘", "🩷"][Math.floor(Math.random() * 6)]}
          </span>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8 max-w-lg mx-auto">
        {/* Big Heart with bounce-in */}
        <div 
          className={`text-8xl sm:text-9xl transition-all duration-500 ${
            showYay ? 'animate-bounce-in animate-heart-beat' : 'opacity-0 scale-0'
          }`}
        >
          💖
        </div>

        {/* Celebration Text */}
        <div className="space-y-4">
          {/* YAY with bounce-in */}
          <h1 
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-valentine-600 text-shadow-soft transition-all duration-500 ${
              showYay ? 'animate-bounce-in' : 'opacity-0 scale-0'
            }`}
          >
            YAY! 🎉
          </h1>
          
          {/* "Said YES!" with special animation */}
          <div 
            className={`transition-all duration-700 ${
              showSaidYes ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-2xl sm:text-3xl lg:text-4xl text-valentine-500">
              {toName} said{" "}
              <span className="inline-block animate-bounce-in text-valentine-600 font-bold">
                YES!
              </span>
            </p>
          </div>
        </div>

        {/* Final Message Card */}
        {finalMessage && (
          <div 
            className={`
              card-valentine bg-white/90 backdrop-blur-sm 
              transition-all duration-700 delay-100
              ${showMessage ? 'opacity-100 translate-y-0 animate-gentle-float' : 'opacity-0 translate-y-8'}
            `}
          >
            <p className="text-valentine-400 text-sm sm:text-base mb-3">
              A message from {fromName}:
            </p>
            <p className="text-xl sm:text-2xl lg:text-3xl text-valentine-600 font-handwriting leading-relaxed">
              &ldquo;{finalMessage}&rdquo;
            </p>
          </div>
        )}

        {/* Footer */}
        <div 
          className={`space-y-4 pt-4 transition-all duration-700 ${
            showFooter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-valentine-500 text-lg sm:text-xl">
            Happy Valentine&apos;s Day! 💕
          </p>
          <p className="text-valentine-400 text-sm">
            Made with ❤️ on AskYourValentine
          </p>
        </div>
      </div>
    </div>
  );
}
