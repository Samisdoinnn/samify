'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { pageTransition } from '@/lib/gsap-animations';

interface GSAPPageTransitionProps {
  children: ReactNode;
}

export default function GSAPPageTransition({ children }: GSAPPageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      pageTransition.enter(containerRef.current);
    }
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
