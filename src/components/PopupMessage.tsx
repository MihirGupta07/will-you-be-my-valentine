"use client";

import { useEffect, useState } from "react";

interface PopupMessageProps {
  message: string;
  onDismiss: () => void;
  autoDismissMs?: number;
}

export default function PopupMessage({
  message,
  onDismiss,
  autoDismissMs = 2000,
}: PopupMessageProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation
    requestAnimationFrame(() => setIsVisible(true));

    // Auto dismiss
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 300); // Wait for exit animation
    }, autoDismissMs);

    return () => clearTimeout(timer);
  }, [autoDismissMs, onDismiss]);

  return (
    <div
      className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4"
      }`}
    >
      <div className="bg-white rounded-2xl shadow-valentine-lg px-6 py-4 border-2 border-valentine-200">
        <p className="text-valentine-600 font-semibold text-lg whitespace-nowrap">
          {message}
        </p>
      </div>
    </div>
  );
}
