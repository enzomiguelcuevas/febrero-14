"use client";

import { useState, useEffect, useMemo } from "react";
import { X, Heart, Camera, ChevronLeft, MapPin } from "lucide-react";
import { Photo, PhotoGalleryProps } from "@/types/photo.types";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function PhotoGallery({ isVisible, onBack }: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loadedPhotos, setLoadedPhotos] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isVisible) {
      const categories = ["momentos", "recuerdos", "especial"] as const;
      const allPhotos: Photo[] = [];

      for (const category of categories) {
        const categoryPhotos: Photo[] = Array.from({ length: 4 }, (_, i) => ({
          id: `${category}-${i + 1}`,
          src: `/${category}/${category}-${i + 1}.jpg`,
          alt: `Foto ${i + 1} de ${category}`,
          category,
          loaded: false,
        }));
        allPhotos.push(...categoryPhotos);
      }
      setPhotos(allPhotos);
    }
  }, [isVisible]);

  const handleImageLoad = (photoId: string) => {
    setLoadedPhotos((prev) => new Set(prev).add(photoId));
  };

  const groupedPhotos = useMemo(() => {
    return photos.reduce(
      (acc, photo) => {
        if (!acc[photo.category]) {
          acc[photo.category] = [];
        }
        acc[photo.category].push(photo);
        return acc;
      },
      {} as Record<string, Photo[]>,
    );
  }, [photos]);

  if (!isVisible) return null;

  return (
    <div className="min-h-screen bg-valentine-cream">
      {/* Header Galería */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-valentine-pink/20 px-4 py-4 md:py-6 flex items-center justify-between shadow-sm">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2 text-valentine-dark font-bold hover:text-valentine-red transition-all group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">Volver</span>
        </Button>
        <h1 className="font-romantic text-3xl md:text-5xl text-valentine-red font-bold text-center flex-1 drop-shadow-sm">
          Nuestra Historia
        </h1>
        <div className="w-12 sm:w-20" />
      </div>

      <div className="pt-8 pb-32 px-4 max-w-7xl mx-auto">
        {Object.entries(groupedPhotos).map(
          ([category, categoryPhotos], categoryIndex) => (
            <div
              key={category}
              className="mb-20 animate-fade-in-up"
              style={{ animationDelay: `${categoryIndex * 0.2}s` }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="p-4 bg-valentine-pink/20 rounded-3xl shadow-inner">
                  <Camera className="w-8 h-8 text-valentine-red" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-valentine-dark capitalize tracking-tight">
                  {category === "momentos"
                    ? "Momentos Mágicos"
                    : category === "recuerdos"
                      ? "Dulces Recuerdos"
                      : "Nuestro Día Especial"}
                </h2>
                <div className="flex-1 h-[3px] bg-linear-to-r from-valentine-pink/40 to-transparent rounded-full" />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                {categoryPhotos.map((photo, photoIndex) => (
                  <Dialog key={photo.id}>
                    <DialogTrigger asChild>
                      <div
                        className="group relative aspect-4/5 cursor-pointer rounded-3xl md:rounded-[3rem] overflow-hidden bg-white shadow-2xl hover:shadow-[0_20px_50px_rgba(255,77,109,0.3)] transition-all duration-700 hover:-translate-y-4 animate-fade-in-up border-4 border-white"
                        style={{
                          animationDelay: `${categoryIndex * 0.3 + photoIndex * 0.15}s`,
                        }}
                      >
                        <div className="absolute inset-0">
                          {!loadedPhotos.has(photo.id) && (
                            <div className="absolute inset-0 bg-valentine-pink/10 animate-pulse flex items-center justify-center">
                              <Heart className="w-12 h-12 text-valentine-pink/30 animate-ping" />
                            </div>
                          )}
                          <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            className={`object-cover transition-transform duration-1000 group-hover:scale-110 ${
                              loadedPhotos.has(photo.id)
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                            onLoad={() => handleImageLoad(photo.id)}
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-valentine-red/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30 scale-50 group-hover:scale-100 transition-transform duration-500">
                              <Heart className="w-10 h-10 text-white fill-current" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent
                      className="max-w-[100vw] h-full p-0 overflow-hidden bg-black/95 border-none flex flex-col items-center justify-center z-[300]"
                      showCloseButton={false}
                    >
                      <DialogHeader className="sr-only">
                        <DialogTitle>Nuestra Foto</DialogTitle>
                        <DialogDescription>
                          Visualización a pantalla completa
                        </DialogDescription>
                      </DialogHeader>

                      <div className="relative w-full h-full flex items-center justify-center bg-black/40 backdrop-blur-lg">
                        <div className="absolute top-4 right-4 z-[310]">
                          <DialogClose asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-white hover:bg-white/20 rounded-full h-12 w-12"
                            >
                              <X className="w-8 h-8" />
                            </Button>
                          </DialogClose>
                        </div>

                        <div className="relative w-full h-full p-4 flex items-center justify-center">
                          <Image
                            src={photo.src}
                            alt={photo.alt}
                            width={1920}
                            height={1080}
                            className="max-h-[95vh] w-auto max-w-[95vw] object-contain rounded-lg shadow-[0_0_50px_rgba(255,133,162,0.3)]"
                            priority
                          />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          ),
        )}
      </div>

      {/* Floating Map Button */}
      <div className="fixed bottom-40 lg:bottom-32 right-6 z-50">
        <Button
          size="lg"
          onClick={() =>
            window.open(
              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Urípa, Chincheros, Apurímac, Perú")}`,
              "_blank",
            )
          }
          className="bg-valentine-red hover:bg-valentine-red/90 text-white rounded-full shadow-[0_5px_25px_rgba(255,77,109,0.5)] flex items-center gap-3 px-6 py-7 md:py-8 group animate-bounce hover:animate-none transition-all"
        >
          <div className="p-2 bg-white/20 rounded-full group-hover:rotate-12 transition-transform">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="text-left hidden md:block">
            <span className="block text-xs font-medium opacity-80 uppercase tracking-widest">
              Ver Nuestro Lugar
            </span>
            <span className="block text-sm font-bold">
              Ubicación Especial ✨
            </span>
          </div>
          <span className="md:hidden font-bold">Ubicación</span>
        </Button>
      </div>
    </div>
  );
}
