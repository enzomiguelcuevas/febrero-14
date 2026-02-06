'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { MapPin, Heart } from 'lucide-react'

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false })

interface MapComponentProps {
  location: string
}

export default function MapComponent({ location }: MapComponentProps) {
  const [L, setL] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    import('leaflet').then((leaflet) => {
      setL(leaflet)
      
      delete (leaflet.Icon.Default.prototype as any)._getIconUrl
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      })
    })
  }, [])

  const position: [number, number] = [-13.7125, -73.8841]

  if (!mounted || !L) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-64 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center"
      >
        <div className="text-center">
          <MapPin className="w-8 h-8 text-pink-500 mx-auto mb-2" />
          <p className="text-gray-600">Cargando mapa...</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
    >
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
          Ubicación Especial
        </h3>
        <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
          <MapPin className="w-4 h-4" />
          <p className="text-sm">{location}</p>
        </div>
        <Heart className="w-4 h-4 text-pink-400 mx-auto" fill="currentColor" />
      </div>

      <div className="rounded-xl overflow-hidden shadow-inner">
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: '300px', width: '100%' }}
          className="z-10"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              <div className="text-center">
                <Heart className="w-4 h-4 text-pink-500 mx-auto mb-1" fill="currentColor" />
                <p className="font-semibold text-sm">Nuestro lugar especial</p>
                <p className="text-xs text-gray-600">{location}</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="mt-4 text-center">
        <motion.a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-medium rounded-full shadow hover:shadow-lg transition-shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MapPin className="w-4 h-4" />
          Abrir en Google Maps
        </motion.a>
      </div>
    </motion.div>
  )
}