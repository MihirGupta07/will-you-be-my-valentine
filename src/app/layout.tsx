import type { Metadata } from "next";
import { Nunito, Caveat } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AskYourValentine 💕",
  description:
    "Create a cute, personalized Valentine's Day page for someone special!",
  keywords: ["valentine", "love", "romantic", "cute", "proposal"],
  openGraph: {
    title: "AskYourValentine 💕",
    description: "Will you be my Valentine? Create your own cute proposal!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${caveat.variable}`}>
      <body className="font-sans antialiased min-h-screen">{children}</body>
    </html>
  );
}
