export interface Flower {
  id: number
  type: 'lily' | 'rose'
  x: number
  y: number
  size: number
  rotation: number
  duration: number
  delay: number
  opacity: number
}

export interface FlowerAnimationProps {
  trigger: boolean
  onComplete?: () => void
}