export interface Photo {
  id: string
  src: string
  alt: string
  category: 'momentos' | 'recuerdos' | 'especial'
  loaded: boolean
}

export interface PhotoGalleryProps {
  isVisible: boolean
  onBack?: () => void
}

export interface PhotoModalProps {
  photo: Photo
  onClose: () => void
}