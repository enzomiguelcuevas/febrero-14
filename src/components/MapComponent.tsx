"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { MapPin, Heart, ExternalLink } from "lucide-react";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false },
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false },
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

interface MapComponentProps {
  location: string;
}

export default function MapComponent({ location }: MapComponentProps) {
  const [L, setL] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      import("leaflet").then((leaflet) => {
        setL(leaflet);
        delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
        leaflet.Icon.Default.mergeOptions({
          iconRetinaUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        });
      });
    }
  }, []);

  const position: [number, number] = [-13.7125, -73.8841];

  if (!mounted || !L) {
    return (
      <div className="w-full h-64 bg-valentine-pink/10 rounded-3xl flex items-center justify-center animate-pulse">
        <div className="text-center">
          <MapPin className="w-8 h-8 text-valentine-pink mx-auto mb-2" />
          <p className="text-valentine-dark/60 font-medium">
            Cargando mapa con amor...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] p-6 md:p-8 shadow-2xl border border-white/50 animate-fade-in-up">
      <div className="mb-6 flex flex-col items-center">
        <div className="w-12 h-12 bg-valentine-red/10 rounded-2xl flex items-center justify-center mb-4">
          <MapPin className="w-6 h-6 text-valentine-red" />
        </div>
        <h3 className="text-2xl font-bold text-valentine-dark mb-1 font-romantic">
          Nuestro Lugar de Encuentro
        </h3>
        <p className="text-sm text-valentine-dark/60 font-medium flex items-center gap-2">
          {location}
        </p>
      </div>

      <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-72 relative group">
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
          className="z-10"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              <div className="text-center p-1">
                <Heart className="w-5 h-5 text-valentine-red mx-auto mb-2 fill-current" />
                <p className="font-bold text-valentine-dark">
                  ¡Te espero aquí!
                </p>
                <p className="text-xs text-valentine-dark/70 mt-1">
                  Hagamos este momento eterno ✨
                </p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="mt-8 text-center">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-3 bg-valentine-red text-white text-sm font-bold rounded-full shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all group"
        >
          <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span>Ver Ruta en Google Maps</span>
        </a>
      </div>
    </div>
  );
}
