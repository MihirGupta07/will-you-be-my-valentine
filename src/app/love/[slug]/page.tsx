import FloatingHearts from "@/components/FloatingHearts";
import PopUpHell from "@/components/PopUpHell";
import Link from "next/link";
import { adminDb, isFirebaseAdminConfigured } from "@/lib/firebase-admin";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface ValentineData {
  slug: string;
  fromName: string;
  toName: string;
  finalMessage?: string;
}

async function getValentine(slug: string): Promise<ValentineData | null> {
  if (isFirebaseAdminConfigured() && adminDb) {
    // Use Firestore
    try {
      const docRef = adminDb.collection("valentines").doc(slug);
      const doc = await docRef.get();
      
      if (!doc.exists) {
        return null;
      }
      
      return doc.data() as ValentineData;
    } catch (error) {
      console.error("Error fetching valentine:", error);
      return null;
    }
  } else {
    // Development mode: try the API route
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
      const response = await fetch(`${baseUrl}/api/valentines?slug=${slug}`, {
        cache: "no-store",
      });
      
      if (!response.ok) {
        return null;
      }
      
      const data = await response.json();
      return data.valentine as ValentineData;
    } catch (error) {
      // In dev mode without a valentine created, return demo data
      console.log("[DEV MODE] Valentine not found, showing demo");
      return null;
    }
  }
}

export default async function ValentinePage({ params }: PageProps) {
  const { slug } = await params;
  
  // Try to fetch the valentine
  let valentine = await getValentine(slug);

  // If not found, check if this is a demo/test slug
  if (!valentine) {
    // Allow demo mode for testing with special slug
    if (slug === "demo" || slug === "test123") {
      valentine = {
        slug,
        fromName: "Someone Special",
        toName: "You",
        finalMessage: "This is a demo! Create your own Valentine page and share it with someone you love! 💕",
      };
    } else {
      // Show not found page
      return (
        <main className="relative min-h-screen flex flex-col items-center justify-center px-4">
          <FloatingHearts />
          
          <div className="relative z-10 text-center space-y-8 max-w-lg mx-auto">
            <div className="card-valentine space-y-6 animate-pop-in">
              <div className="text-6xl">💔</div>
              <h1 className="text-2xl font-bold text-valentine-600">
                Oops! This Valentine doesn&apos;t exist
              </h1>
              <p className="text-valentine-500">
                Maybe the link is wrong, or love has expired...
              </p>
            </div>
            
            <Link href="/create" className="btn-yes inline-block">
              Create Your Own 💝
            </Link>
            
            <div>
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
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <FloatingHearts />
      
      <div className="relative z-10">
        <PopUpHell
          fromName={valentine.fromName}
          toName={valentine.toName}
          finalMessage={valentine.finalMessage}
        />
      </div>
    </main>
  );
}

// Generate metadata for the page
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  
  return {
    title: `Will you be my Valentine? 💕 | AskYourValentine`,
    description: "Someone special has a question for you...",
    openGraph: {
      title: "Will you be my Valentine? 💕",
      description: "Someone special has a question for you...",
      type: "website",
    },
  };
}
