import type { Metadata } from "next";
import { Outfit, Dancing_Script } from "next/font/google";
import "./globals.css";
import { MusicProvider } from "@/components/MusicProvider";
import MusicPlayer from "@/components/MusicPlayer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mi Amor - 14 de Febrero",
  description: "Una invitación especial para un día inolvidable",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${outfit.variable} ${dancingScript.variable} font-sans antialiased bg-valentine-cream text-valentine-dark min-h-screen relative pb-32 md:pb-40`}
      >
        <MusicProvider>
          {children}
          <MusicPlayer />
        </MusicProvider>
      </body>
    </html>
  );
}
