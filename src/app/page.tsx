import Link from "next/link";
import FloatingHearts from "@/components/FloatingHearts";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Floating hearts background */}
      <FloatingHearts />

      {/* Main content */}
      <div className="relative z-10 text-center space-y-8 max-w-lg mx-auto">
        {/* Logo / Title */}
        <div className="space-y-4">
          <div className="text-6xl sm:text-7xl animate-heart-beat">💕</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-valentine-600 text-shadow-soft">
            AskYourValentine
          </h1>
          <p className="text-lg sm:text-xl text-valentine-500 font-medium">
            Create a cute proposal for someone special
          </p>
        </div>

        {/* Description */}
        <div className="card-valentine space-y-4 animate-pop-in">
          <p className="text-valentine-600 leading-relaxed">
            Send them a link they can&apos;t say no to! 💘
          </p>
          <p className="text-valentine-400 text-sm">
            (Literally, the &quot;No&quot; button has a mind of its own 😏)
          </p>
        </div>

        {/* CTA Button */}
        <Link
          href="/create"
          className="btn-yes inline-block text-xl px-12 py-5 animate-bounce-soft"
        >
          Create Your Valentine 💝
        </Link>

        {/* Footer */}
        <p className="text-valentine-400 text-sm pt-8">
          Made with 💖 for lovers everywhere
        </p>
      </div>
    </main>
  );
}
