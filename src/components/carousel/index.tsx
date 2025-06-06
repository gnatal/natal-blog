'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause, Download, Camera } from 'lucide-react'
import html2canvas from 'html2canvas'
import type { CarouselProps } from '../../types/carousel'

const Carousel: React.FC<CarouselProps> = ({ 
  slides, 
  autoAdvance = true, 
  autoAdvanceInterval = 8000 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const slideRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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

  // Download current slide as PNG with better error handling
  const downloadSlideAsPNG = useCallback(async () => {
    if (!slideRef.current) return

    try {
      setIsDownloading(true)

      // Wait for animations to complete
      await new Promise(resolve => setTimeout(resolve, 500))

      // Create a temporary element for capturing
      const element = slideRef.current.cloneNode(true) as HTMLElement
      
      // Apply inline styles to avoid CSS parsing issues
      element.style.width = '1080px'
      element.style.height = '1080px'
      element.style.position = 'fixed'
      element.style.left = '-9999px'
      element.style.top = '0'
      element.style.zIndex = '-1'
      
      document.body.appendChild(element)

      const canvas = await html2canvas(element, {
        backgroundColor: '#1e3a8a', // Fallback background
        scale: 2,
        useCORS: true,
        allowTaint: false,
        foreignObjectRendering: true,
        width: 1080,
        height: 1080,
        windowWidth: 1080,
        windowHeight: 1080,
        ignoreElements: (element) => {
          // Ignore elements that might cause issues
          return element.classList?.contains('backdrop-blur-sm') || false
        },
        onclone: (clonedDoc) => {
          // Replace problematic CSS with compatible versions
          const style = clonedDoc.createElement('style')
          style.textContent = `
            .backdrop-blur-sm { background-color: rgba(255, 255, 255, 0.1) !important; }
            * { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }
          `
          clonedDoc.head.appendChild(style)
        }
      })

      // Clean up
      document.body.removeChild(element)

      // Create and trigger download
      const link = document.createElement('a')
      link.download = `stoic-developer-slide-${currentSlide + 1}.png`
      link.href = canvas.toDataURL('image/png', 1.0)
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

    } catch (error) {
      console.error('Error downloading slide:', error)
      
      // Fallback method - try without advanced features
      try {
        if (slideRef.current) {
          const canvas = await html2canvas(slideRef.current, {
            backgroundColor: '#1e3a8a',
            scale: 1,
            useCORS: false,
            allowTaint: true,
            foreignObjectRendering: false,
          })

          const link = document.createElement('a')
          link.download = `stoic-developer-slide-${currentSlide + 1}.png`
          link.href = canvas.toDataURL('image/png', 0.9)
          
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      } catch (fallbackError) {
        console.error('Fallback download failed:', fallbackError)
        alert('Unable to download slide. Please try taking a screenshot instead.')
      }
    } finally {
      setIsDownloading(false)
    }
  }, [currentSlide])

  // Download all slides
  const downloadAllSlidesAsPNG = useCallback(async () => {
    setIsDownloading(true)
    
    for (let i = 0; i < slides.length; i++) {
      setCurrentSlide(i)
      await new Promise(resolve => setTimeout(resolve, 1000))
      await downloadSlideAsPNG()
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    
    setIsDownloading(false)
  }, [slides.length, downloadSlideAsPNG])

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
      if (e.key === 'd' || e.key === 'D') {
        e.preventDefault()
        downloadSlideAsPNG()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [prevSlide, nextSlide, toggleAutoplay, downloadSlideAsPNG])

  return (
    <div 
      ref={containerRef}
      className="relative max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
    >
      {/* Download Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="absolute top-4 right-4 z-20 flex gap-2"
      >
        <button
          onClick={downloadSlideAsPNG}
          disabled={isDownloading}
          className="p-3 rounded-full transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.6)', 
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
          aria-label="Download current slide as PNG"
          title="Download current slide (D key)"
        >
          {isDownloading ? (
            <div 
              className="w-5 h-5 rounded-full animate-spin"
              style={{ 
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderTop: '2px solid white'
              }}
            />
          ) : (
            <Camera className="w-5 h-5" />
          )}
        </button>
        
        <button
          onClick={downloadAllSlidesAsPNG}
          disabled={isDownloading}
          className="p-3 rounded-full transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.6)', 
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
          aria-label="Download all slides as PNG"
          title="Download all slides"
        >
          <Download className="w-5 h-5" />
        </button>
      </motion.div>

      {/* Slide Container */}
      <div className="relative aspect-square overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            ref={slideRef}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.4, 0, 0.2, 1] 
            }}
            className={`absolute inset-0 ${slides[currentSlide].gradientClass} text-white p-16 flex flex-col justify-center`}
          >
            {/* Slide Number */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="absolute top-8 right-8 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {currentSlide + 1}/{slides.length}
            </motion.div>

            {/* Slide Content */}
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

      {/* Navigation Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 px-6 py-3 rounded-full"
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <button
          onClick={prevSlide}
          disabled={isDownloading}
          className="p-2 rounded-full transition-all duration-200 hover:scale-110 disabled:opacity-50"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isDownloading}
              className={`w-2 h-2 rounded-full transition-all duration-200 disabled:opacity-50 ${
                index === currentSlide 
                  ? 'scale-125' 
                  : 'hover:opacity-80'
              }`}
              style={{ 
                backgroundColor: index === currentSlide 
                  ? 'white' 
                  : 'rgba(255, 255, 255, 0.4)'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={isDownloading}
          className="p-2 rounded-full transition-all duration-200 hover:scale-110 disabled:opacity-50"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        <div 
          className="w-px h-6 mx-2"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
        />
        
        <button
          onClick={toggleAutoplay}
          disabled={isDownloading}
          className="p-2 rounded-full transition-all duration-200 hover:scale-110 disabled:opacity-50"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          aria-label={isPlaying ? 'Pause autoplay' : 'Play autoplay'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-white" />
          ) : (
            <Play className="w-4 h-4 text-white" />
          )}
        </button>
      </motion.div>

      {/* Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        <motion.div
          className="h-full"
          style={{ backgroundColor: 'white' }}
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Instructions */}
      <div 
        className="absolute top-4 left-4 text-xs hidden sm:block"
        style={{ color: 'rgba(255, 255, 255, 0.6)' }}
      >
        <div>Use ← → keys or click to navigate</div>
        <div>Press 'D' to download current slide</div>
      </div>

      {/* Download Status */}
      {isDownloading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center z-30"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div 
            className="p-6 rounded-2xl text-white text-center"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            <div 
              className="w-8 h-8 rounded-full animate-spin mx-auto mb-4"
              style={{ 
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderTop: '2px solid white'
              }}
            />
            <p className="text-lg font-semibold">Generating PNG...</p>
            <p className="text-sm opacity-80">Please wait</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Carousel