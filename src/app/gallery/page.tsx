"use client";

import PhotoGallery from "@/components/PhotoGallery";
import { useRouter } from "next/navigation";

export default function GalleryPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-valentine-cream font-sans">
      <PhotoGallery isVisible={true} onBack={() => router.push("/")} />
    </main>
  );
}
