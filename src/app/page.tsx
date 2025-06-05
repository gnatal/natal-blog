// app/page.tsx
import Carousel from '../components/carousel'
import { slidesData } from '../data/slidesData'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-12 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          The Stoic Developer
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        {`
          Ancient wisdom for modern software engineering. Explore how Marcus Aurelius' 
          teachings can transform your approach to coding under pressure.
        `}
        </p>
      </div>

      {/* Carousel */}
      <Carousel 
        slides={slidesData} 
        autoAdvance={true} 
        autoAdvanceInterval={10000} 
      />

      {/* Footer */}
      <div className="text-center mt-12">
        <p className="text-gray-500 text-sm">
          Use arrow keys, click navigation, or let it auto-advance
        </p>
        <div className="mt-4 flex justify-center gap-4 text-sm text-gray-600">
          <span>Built with Next.js & TypeScript</span>
          <span>•</span>
          <span>Animated with Framer Motion</span>
        </div>
      </div>
    </main>
  )
}