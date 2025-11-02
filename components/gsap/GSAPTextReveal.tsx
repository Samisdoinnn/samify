'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { splitTextReveal } from '@/lib/gsap-animations';

interface GSAPTextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}

export default function GSAPTextReveal({ 
  children, 
  className = '', 
  delay = 0,
  stagger = 0.08 
}: GSAPTextRevealProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      splitTextReveal(textRef.current, { delay, stagger });
    }
  }, [delay, stagger]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
}
