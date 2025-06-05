// types/carousel.ts
export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  gradientClass: string;
}

export interface CarouselProps {
  slides: SlideData[];
  autoAdvance?: boolean;
  autoAdvanceInterval?: number;
}

export interface DisciplineItemProps {
  title: string;
  description: string;
}

export interface InsightBoxProps {
  label: string;
  text: string;
}

export interface PrincipleBoxProps {
  number: number;
  title: string;
  description: string;
}

export interface QuoteProps {
  children: React.ReactNode;
}

export interface HashtagsProps {
  tags: string[];
}