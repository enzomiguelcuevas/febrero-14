'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Camera } from 'lucide-react'
import { Photo, PhotoGalleryProps, PhotoModalProps } from '@/types/photo.types'
import Image from 'next/image'

// Componente para modal de foto
function PhotoModal({ photo, onClose }: PhotoModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-pointer"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl max-h-[90vh] mx-auto"
      >
        <div className="relative">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={800}
            height={600}
            className="rounded-lg shadow-2xl max-w-full max-h-[90vh] object-contain"
            priority
          />
          
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
          
          {/* Badge de categoría */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 rounded-full shadow-lg">
            <p className="text-xs font-medium text-gray-700 capitalize">
              {photo.category === 'momentos' ? '✨ Momentos' : 
               photo.category === 'recuerdos' ? '💭 Recuerdos' : '💖 Especial'}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function PhotoGallery({ isVisible, onBack }: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [loadedPhotos, setLoadedPhotos] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (isVisible) {
      // Cargar fotos automáticamente de las carpetas
      const loadPhotos = async () => {
        const categories = ['momentos', 'recuerdos', 'especial'] as const
        const allPhotos: Photo[] = []
        
        for (const category of categories) {
          // Fotos placeholder - esto buscará en src/assets/photos/{category}/
          try {
            // Simular carga de fotos (en producción esto buscaría archivos reales)
            const categoryPhotos: Photo[] = Array.from({ length: 4 }, (_, i) => ({
              id: `${category}-${i + 1}`,
              src: `/${category}/${category}-${i + 1}.jpg`,
              alt: `Foto ${i + 1} de ${category}`,
              category,
              loaded: false
            }))
            allPhotos.push(...categoryPhotos)
          } catch (error) {
            console.log(`No se encontraron fotos en ${category}:`, error)
          }
        }
        
        setPhotos(allPhotos)
      }

      loadPhotos()
    }
  }, [isVisible])

  const handleImageLoad = (photoId: string) => {
    setLoadedPhotos(prev => new Set(prev).add(photoId))
  }

  const groupedPhotos = photos.reduce((acc, photo) => {
    if (!acc[photo.category]) {
      acc[photo.category] = []
    }
    acc[photo.category].push(photo)
    return acc
  }, {} as Record<string, Photo[]>)

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-amber-50"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-pink-100"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
            </motion.div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Nuestros Momentos Especiales
            </h1>
          </div>
          
          <motion.button
            onClick={onBack}
            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-4 h-4" />
            Volver
          </motion.button>
        </div>
      </motion.div>

      {/* Galería de Fotos */}
      <div className="pt-24 pb-12 px-4">
        {Object.entries(groupedPhotos).map(([category, categoryPhotos], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + categoryIndex * 0.2 }}
            className="max-w-7xl mx-auto mb-12"
          >
            {/* Título de Categoría */}
            <div className="flex items-center gap-3 mb-6">
              <Camera className="w-5 h-5 text-pink-500" />
              <h2 className="text-2xl font-bold text-gray-800 capitalize">
                {category === 'momentos' ? '✨ Momentos Especiales' : 
                 category === 'recuerdos' ? '💭 Recuerdos Memorables' : '💖 Día Especial'}
              </h2>
              <div className="h-1 flex-1 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full" />
            </div>

            {/* Grid de Fotos */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categoryPhotos.map((photo, photoIndex) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.7 + categoryIndex * 0.1 + photoIndex * 0.05,
                    type: "spring",
                    stiffness: 200
                  }}
                  className="group relative cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative overflow-hidden rounded-xl shadow-lg bg-white p-1">
                    {/* Estado de carga */}
                    {!loadedPhotos.has(photo.id) && (
                      <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
                        <div className="w-8 h-8 border-2 border-pink-300 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                    
                    {/* Imagen */}
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={300}
                      height={400}
                      className={`w-full h-48 object-cover rounded-lg transition-all duration-300 group-hover:brightness-110 group-hover:scale-105 ${
                        loadedPhotos.has(photo.id) ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => handleImageLoad(photo.id)}
                      onError={() => console.log(`Error cargando imagen: ${photo.src}`)}
                    />
                    
                    {/* Overlay hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
                    
                    {/* Icono cámara */}
                    <motion.div
                      className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Camera className="w-4 h-4 text-gray-700" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Si no hay fotos en esta categoría */}
            {categoryPhotos.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-gray-500"
              >
                <Camera className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Aún no hay fotos en {category}</p>
                <p className="text-sm mt-2">Agrega fotos a la carpeta <code className="bg-gray-100 px-2 py-1 rounded">src/assets/photos/{category}/</code></p>
              </motion.div>
            )}
          </motion.div>
        ))}

        {/* Si no hay fotos en absoluto */}
        {photos.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center py-20"
          >
            <Camera className="w-16 h-16 mx-auto mb-6 text-gray-300" />
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Aún no hay fotos
            </h2>
            <p className="text-gray-600 mb-6">
              Agrega tus fotos a las carpetas de src/assets/photos/ para que aparezcan aquí
            </p>
            <div className="bg-white/80 rounded-lg p-6 border border-pink-200 text-left">
              <p className="font-medium text-gray-700 mb-3">📁 Estructura de carpetas:</p>
              <code className="block bg-gray-100 p-3 rounded text-sm">
                src/assets/photos/<br/>
                ├── momentos/<br/>
                ├── recuerdos/<br/>
                └── especial/
              </code>
            </div>
          </motion.div>
        )}
      </div>

      {/* Modal de foto seleccionada */}
      <AnimatePresence>
        {selectedPhoto && (
          <PhotoModal
            photo={selectedPhoto}
            onClose={() => setSelectedPhoto(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}