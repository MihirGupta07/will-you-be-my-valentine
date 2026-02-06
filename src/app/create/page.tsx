import FloatingHearts from "@/components/FloatingHearts";
import ValentineForm from "@/components/ValentineForm";
import Link from "next/link";

export default function CreatePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <FloatingHearts />

      <div className="relative z-10 w-full max-w-md mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block group">
            <h1 className="text-3xl font-bold text-valentine-600 group-hover:text-valentine-500 transition-colors">
              AskYourValentine 💕
            </h1>
          </Link>
          <p className="text-valentine-500">Create your Valentine page</p>
        </div>

        {/* Form */}
        <ValentineForm />

        {/* Back link */}
        <div className="text-center">
          <Link
            href="/"
            className="text-valentine-400 hover:text-valentine-500 text-sm transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
