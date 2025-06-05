// components/slides/SlideComponents.tsx
import React from 'react'
import type { 
  DisciplineItemProps, 
  InsightBoxProps, 
  PrincipleBoxProps, 
  QuoteProps, 
  HashtagsProps 
} from '../../types/carousel'

export const DisciplineItem: React.FC<DisciplineItemProps> = ({ 
  title, 
  description 
}) => (
  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl mb-4 border border-white/10 border-l-4 border-l-yellow-300">
    <h3 className="text-yellow-300 font-bold text-xl mb-3">{title}</h3>
    <p className="text-lg leading-relaxed opacity-95">{description}</p>
  </div>
)

export const InsightBox: React.FC<InsightBoxProps> = ({ label, text }) => (
  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl mb-4 border border-white/10">
    <h4 className="text-yellow-300 font-bold text-lg mb-3">{label}</h4>
    <p className="text-lg leading-relaxed">{text}</p>
  </div>
)

export const PrincipleBox: React.FC<PrincipleBoxProps> = ({ 
  number, 
  title, 
  description 
}) => (
  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl mb-4 border border-white/10 flex items-start gap-6">
    <div className="bg-yellow-300 text-gray-900 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
      {number}
    </div>
    <div>
      <h4 className="text-yellow-300 font-bold text-xl mb-3">{title}</h4>
      <p className="text-lg leading-relaxed">{description}</p>
    </div>
  </div>
)

export const Quote: React.FC<QuoteProps> = ({ children }) => (
  <div className="relative bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 my-6">
    <div className="absolute top-2 left-4 text-6xl text-white/20 font-serif">"</div>
    <div className="absolute bottom-2 right-4 text-6xl text-white/20 font-serif">"</div>
    <p className="text-xl italic text-center leading-relaxed relative z-10">
      {children}
    </p>
  </div>
)

export const Hashtags: React.FC<HashtagsProps> = ({ tags }) => (
  <div className="absolute bottom-8 left-8 right-8 text-center">
    <p className="text-sm opacity-80 font-medium">
      {tags.map(tag => `#${tag}`).join(' ')}
    </p>
  </div>
)