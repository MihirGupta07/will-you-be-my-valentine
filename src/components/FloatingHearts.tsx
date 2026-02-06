"use client";

import { useEffect, useState } from "react";

interface Heart {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  emoji: string;
}

const HEART_EMOJIS = ["💕", "💖", "💗", "💓", "💝", "💘", "❤️", "🩷"];

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Generate random hearts on mount
    const generatedHearts: Heart[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
      size: 16 + Math.random() * 20,
      emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
    }));
    setHearts(generatedHearts);
  }, []);

  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            fontSize: `${heart.size}px`,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  );
}
