'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import type { CarouselProps } from '../../types/carousel'

const Carousel: React.FC<CarouselProps> = ({ 
  slides, 
  autoAdvance = true, 
  autoAdvanceInterval = 8000 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  const toggleAutoplay = useCallback(() => {
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, autoAdvanceInterval)

    return () => clearInterval(interval)
  }, [isPlaying, autoAdvanceInterval, nextSlide])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === ' ') {
        e.preventDefault()
        toggleAutoplay()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [prevSlide, nextSlide, toggleAutoplay])

  return (
    <div className="relative max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.4, 0, 0.2, 1] 
            }}
            className={`absolute inset-0 ${slides[currentSlide].gradientClass} text-white p-16 flex flex-col justify-center`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="absolute top-8 right-8 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-white/10"
            >
              {currentSlide + 1}/{slides.length}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex-1 flex flex-col justify-center"
            >
              {slides[currentSlide].content}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        style={{ display: 'none' }}
        className="absolute  bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/80 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10"
      >
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        <div className="w-px h-6 bg-white/20 mx-2" />
        <button
          onClick={toggleAutoplay}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 hover:scale-110"
          aria-label={isPlaying ? 'Pause autoplay' : 'Play autoplay'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-white" />
          ) : (
            <Play className="w-4 h-4 text-white" />
          )}
        </button>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
        <motion.div
          className="h-full bg-white"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="absolute top-4 left-4 text-white/60 text-xs hidden sm:block">
        Use ← → keys or click to navigate
      </div>
    </div>
  )
}

export default Carousel