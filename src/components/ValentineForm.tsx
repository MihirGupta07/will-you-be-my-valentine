"use client";

import { useState } from "react";
import { VALIDATION } from "@/types/valentine";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
  fromName: string;
  toName: string;
  finalMessage: string;
}

interface SuccessData {
  slug: string;
  url: string;
}

// Placeholder suggestions
const NAME_PLACEHOLDERS = [
  "Romeo 💕",
  "Your Beloved 💖",
  "Cupid 🏹",
  "Your Secret Admirer 💌",
];

const THEIR_NAME_PLACEHOLDERS = [
  "Juliet 💕",
  "Your Crush 💖",
  "The One 💘",
  "Your Soulmate 💞",
];

const MESSAGE_PLACEHOLDERS = [
  "I've been wanting to tell you this for so long... 💕",
  "You make every day feel like Valentine's Day! 💖",
  "Being with you is my favorite adventure 🌟",
  "You're the reason I smile every day 😊",
  "Every love song makes me think of you 🎵",
];

export default function ValentineForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const defaultFinalMessage = MESSAGE_PLACEHOLDERS[Math.floor(Math.random() * MESSAGE_PLACEHOLDERS.length)]
  const [formData, setFormData] = useState<FormData>({
    fromName: "",
    toName: "",
    finalMessage: "",
  });
  const [successData, setSuccessData] = useState<SuccessData | null>(null);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState(false);

  // Random placeholders (stable per render)
  const [placeholders] = useState(() => ({
    fromName: NAME_PLACEHOLDERS[Math.floor(Math.random() * NAME_PLACEHOLDERS.length)],
    toName: THEIR_NAME_PLACEHOLDERS[Math.floor(Math.random() * THEIR_NAME_PLACEHOLDERS.length)],
    finalMessage: defaultFinalMessage,
  }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setError("");

    try {
      const response = await fetch("/api/valentines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, finalMessage: formData.finalMessage || defaultFinalMessage }  ),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSuccessData({ slug: data.slug, url: data.url });
      setFormState("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setFormState("error");
    }
  };

  const handleCopy = async () => {
    if (successData?.url) {
      await navigator.clipboard.writeText(successData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCreateAnother = () => {
    setFormState("idle");
    setFormData({ fromName: "", toName: "", finalMessage: "" });
    setSuccessData(null);
    setError("");
  };

  // Success State
  if (formState === "success" && successData) {
    return (
      <div className="card-valentine space-y-6 animate-scale-in animate-gentle-float text-center">
        <div className="text-6xl animate-bounce-in animate-heart-beat">💝</div>
        <h2 className="text-2xl sm:text-3xl font-bold text-valentine-600">
          Your Valentine is ready!
        </h2>
        <p className="text-valentine-500 text-lg">
          Share this link with {formData.toName}:
        </p>

        {/* URL Display */}
        <div className="bg-valentine-50 rounded-2xl p-4 border-2 border-valentine-200">
          <p className="text-valentine-600 font-mono text-sm break-all">
            {successData.url}
          </p>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className={`
            btn-yes w-full flex items-center justify-center gap-2 text-lg
            ${copied ? 'animate-glow-pulse' : ''}
          `}
        >
          {copied ? (
            <>
              <span>Copied!</span>
              <span>✅</span>
            </>
          ) : (
            <>
              <span>Copy Link</span>
              <span>📋</span>
            </>
          )}
        </button>

        {/* Preview Link */}
        <a
          href={`/love/${successData.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-valentine-500 hover:text-valentine-600 underline underline-offset-4 transition-colors text-lg"
        >
          Preview your Valentine →
        </a>

        {/* Create Another */}
        <button
          onClick={handleCreateAnother}
          className="text-valentine-400 hover:text-valentine-500 text-sm transition-colors"
        >
          Create another Valentine
        </button>
      </div>
    );
  }

  // Form State (idle, submitting, error)
  return (
    <form onSubmit={handleSubmit} className="card-valentine space-y-6 animate-scale-in">
      {/* From Name */}
      <div className="space-y-2">
        <label htmlFor="fromName" className="block text-valentine-600 font-semibold text-lg">
          Your Name 💌
        </label>
        <input
          type="text"
          id="fromName"
          name="fromName"
          value={formData.fromName}
          onChange={handleChange}
          placeholder={placeholders.fromName}
          maxLength={VALIDATION.FROM_NAME_MAX}
          required
          disabled={formState === "submitting"}
          className="input-valentine"
        />
        <p className="text-valentine-400 text-xs text-right">
          {formData.fromName.length}/{VALIDATION.FROM_NAME_MAX}
        </p>
      </div>

      {/* To Name */}
      <div className="space-y-2">
        <label htmlFor="toName" className="block text-valentine-600 font-semibold text-lg">
          Their Name 💕
        </label>
        <input
          type="text"
          id="toName"
          name="toName"
          value={formData.toName}
          onChange={handleChange}
          placeholder={placeholders.toName}
          maxLength={VALIDATION.TO_NAME_MAX}
          required
          disabled={formState === "submitting"}
          className="input-valentine"
        />
        <p className="text-valentine-400 text-xs text-right">
          {formData.toName.length}/{VALIDATION.TO_NAME_MAX}
        </p>
      </div>

      {/* Final Message */}
      <div className="space-y-2">
        <label htmlFor="finalMessage" className="block text-valentine-600 font-semibold text-lg">
          Secret Message 🤫
          <span className="text-valentine-400 font-normal text-sm ml-2">(optional)</span>
        </label>
        <textarea
          id="finalMessage"
          name="finalMessage"
          value={formData.finalMessage}
          onChange={handleChange}
          placeholder={placeholders.finalMessage}
          maxLength={VALIDATION.FINAL_MESSAGE_MAX}
          rows={3}
          disabled={formState === "submitting"}
          className="input-valentine resize-none"
        />
        <p className="text-valentine-400 text-xs text-right">
          {formData.finalMessage.length}/{VALIDATION.FINAL_MESSAGE_MAX}
        </p>
      </div>

      {/* Error Message */}
      {formState === "error" && error && (
        <div className="bg-red-50 text-red-600 rounded-xl p-4 text-center text-sm animate-shake">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={formState === "submitting"}
        className="btn-yes w-full text-lg disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {formState === "submitting" ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">💝</span>
            <span>Creating...</span>
          </span>
        ) : (
          <span>Create Valentine 💘</span>
        )}
      </button>
    </form>
  );
}
