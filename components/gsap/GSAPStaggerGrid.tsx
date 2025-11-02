'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { staggerGrid } from '@/lib/gsap-animations';

interface GSAPStaggerGridProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

export default function GSAPStaggerGrid({ 
  children, 
  className = '',
  stagger = 0.1
}: GSAPStaggerGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      const items = gridRef.current.children;
      if (items.length > 0) {
        staggerGrid(Array.from(items) as HTMLElement[], { stagger });
      }
    }
  }, [stagger]);

  return (
    <div ref={gridRef} className={className}>
      {children}
    </div>
  );
}
