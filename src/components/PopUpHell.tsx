"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import CelebrationScreen from "./CelebrationScreen";
import PopupMessage from "./PopupMessage";

interface PopUpHellProps {
  fromName: string;
  toName: string;
  finalMessage?: string;
}

const POPUP_MESSAGES = [
  "Are you sure? 🥺",
  "Please reconsider! 💔",
  "Wrong button! Try again 😤",
  "NO is not an option! 💕",
  "Your mouse slipped, right? 😏",
  "That's not very nice... 🥲",
  "Think about it one more time!",
  "Come onnn! 🙏",
  "But it's Valentine's Day! 💘",
  "You're breaking hearts here! 💔",
  "Oops! Wrong button 🙈",
  "Try the other one! ➡️",
  "Pretty please? 🌸",
  "Don't be shy! 💗",
  "Love is in the air! 🎈",
];

// NO button text progression
const NO_BUTTON_TEXTS = [
  "No 😢",
  "Wait... 🤔",
  "U sure? 🥺",
  "Really?! 😰",
  "Noooo 💔",
  "Plsss 🙏",
  "🥺🥺🥺",
];

// YES button emoji progression
const YES_EMOJIS = ["💖", "💘", "💞", "💕", "❤️‍🔥", "💝"];

export default function PopUpHell({ fromName, toName, finalMessage }: PopUpHellProps) {
  const [noCount, setNoCount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const [messageKey, setMessageKey] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [noButtonHovered, setNoButtonHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  // Calculate YES button scale based on NO clicks
  const yesButtonScale = Math.min(1 + noCount * 0.15, 2.5);
  
  // Calculate NO button scale (shrinks after 4 clicks)
  const noButtonScale = noCount > 3 ? Math.max(1 - (noCount - 3) * 0.1, 0.4) : 1;
  
  // Calculate NO button opacity
  const noButtonOpacity = noCount > 6 ? Math.max(1 - (noCount - 6) * 0.1, 0.5) : 1;

  // Get current NO button text
  const noButtonText = NO_BUTTON_TEXTS[Math.min(noCount, NO_BUTTON_TEXTS.length - 1)];

  // Get current YES emoji
  const yesEmoji = YES_EMOJIS[Math.min(noCount, YES_EMOJIS.length - 1)];

  const moveNoButton = useCallback(() => {
    if (!cardRef.current) return;
    
    // Get card bounds for positioning
    const cardRect = cardRef.current.getBoundingClientRect();
    const maxX = Math.min(cardRect.width / 2, 400);
    const maxY = Math.min(cardRect.height / 2, 400);
    
    // Random position within bounds
    const newX = (Math.random() - 0.5) * maxX * 2;
    const newY = (Math.random() - 0.5) * maxY * 2;
    
    setNoButtonPosition({ x: newX, y: newY });
  }, []);

  // Move NO button on hover
  const handleNoHover = useCallback(() => {
    // if (noCount > 0) {
      moveNoButton();
    // }
    setNoButtonHovered(true);
  }, [noCount, moveNoButton]);

  const handleNoClick = () => {
    const newCount = noCount + 1;
    setNoCount(newCount);
    
    // Shake the card
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);
    
    // Show a popup message
    const randomMessage = POPUP_MESSAGES[Math.floor(Math.random() * POPUP_MESSAGES.length)];
    setCurrentMessage(randomMessage);
    setMessageKey(prev => prev + 1);
  };

  const handleYesClick = () => {
    setAccepted(true);
  };

  const dismissMessage = () => {
    setCurrentMessage(null);
  };

  // Handle keyboard escape to dismiss popup
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dismissMessage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Show celebration screen when accepted
  if (accepted) {
    return (
      <CelebrationScreen
        fromName={fromName}
        toName={toName}
        finalMessage={finalMessage}
      />
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Popup Message */}
      {currentMessage && (
        <PopupMessage
          key={messageKey}
          message={currentMessage}
          onDismiss={dismissMessage}
        />
      )}

      {/* Main Content - Bigger card on mobile and desktop */}
      <div 
        ref={cardRef}
        className={`
          card-valentine text-center space-y-8 mx-auto 
          animate-scale-in animate-gentle-float
          w-[90vw] max-w-[90vw] min-h-[70vh]
          sm:w-[60vw] sm:max-w-[60vw] sm:min-h-[60vh]
          flex flex-col items-center justify-center
          ${isShaking ? 'animate-shake' : ''}
        `}
      >
        {/* Heart */}
        <div className="text-7xl sm:text-8xl animate-heart-beat">💕</div>

        {/* Question */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-valentine-600">
            Hey {toName}! 👋
          </h1>
          <p className="text-2xl sm:text-3xl lg:text-4xl text-valentine-500">
            Will you be my Valentine?
          </p>
          <p className="text-valentine-400 text-lg sm:text-xl">
            With Love, {fromName}
          </p>
        </div>

        {/* Buttons Container */}
        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-6 min-h-[140px] w-full">
          {/* YES Button with glow */}
          <button
            onClick={handleYesClick}
            className={`
              btn-yes text-xl sm:text-2xl px-10 py-5 transition-all duration-300
              ${noCount >= 2 ? 'animate-glow-pulse' : ''}
            `}
            style={{
              transform: `scale(${yesButtonScale})`,
              zIndex: 10,
            }}
          >
            YES {yesEmoji}
          </button>

          {/* NO Button - moves on hover */}
          <button
            ref={noButtonRef}
            onClick={handleNoClick}
            onMouseEnter={handleNoHover}
            onMouseLeave={() => setNoButtonHovered(false)}
            className={`
              btn-no text-lg sm:text-xl px-8 py-4 transition-all duration-200
              ${noButtonHovered && noCount > 0 ? 'animate-wiggle' : ''}
            `}
            style={{
              transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px) scale(${noButtonScale})`,
              opacity: noButtonOpacity,
              position: noCount > 0 ? "absolute" : "relative",
            }}
          >
            {noButtonText}
          </button>
        </div>

        {/* Hint text after a few clicks */}
        {noCount >= 3 && (
          <p className="text-valentine-400 text-base sm:text-lg animate-pop-in">
            {noCount >= 7
              ? "Just click YES already! 😂"
              : noCount >= 5
              ? "The NO button seems to be broken... 🤔"
              : "Hmm, that button seems slippery... 🙄"}
          </p>
        )}
      </div>

      {/* NO Click Counter (subtle) */}
      {noCount > 0 && (
        <div className="absolute bottom-4 right-4 text-valentine-300 text-xs">
          Attempts to escape: {noCount}
        </div>
      )}
    </div>
  );
}
