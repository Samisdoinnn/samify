'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { parallaxScroll } from '@/lib/gsap-animations';

interface GSAPParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export default function GSAPParallax({ 
  children, 
  className = '',
  speed = 0.5
}: GSAPParallaxProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      parallaxScroll(elementRef.current, speed);
    }
  }, [speed]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
