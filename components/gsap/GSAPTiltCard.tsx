'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { cardTilt3D } from '@/lib/gsap-animations';

interface GSAPTiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export default function GSAPTiltCard({ 
  children, 
  className = '',
  maxTilt = 15
}: GSAPTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      const cleanup = cardTilt3D(cardRef.current, maxTilt);
      return cleanup;
    }
  }, [maxTilt]);

  return (
    <div 
      ref={cardRef} 
      className={className}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}
