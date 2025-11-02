'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { scrollReveal } from '@/lib/gsap-animations';

interface GSAPScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function GSAPScrollReveal({ 
  children, 
  className = '',
  delay = 0 
}: GSAPScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      scrollReveal(elementRef.current, { delay });
    }
  }, [delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
