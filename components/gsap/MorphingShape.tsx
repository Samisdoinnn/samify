'use client';

import { useEffect, useRef } from 'react';
import { morphShape } from '@/lib/gsap-animations';

interface MorphingShapeProps {
  className?: string;
}

export default function MorphingShape({ className = '' }: MorphingShapeProps) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (pathRef.current) {
      const shapes = [
        // Circle
        'M100,50 A50,50 0 1,1 100,150 A50,50 0 1,1 100,50',
        // Square
        'M50,50 L150,50 L150,150 L50,150 Z',
        // Star
        'M100,30 L115,85 L170,85 L125,115 L140,170 L100,140 L60,170 L75,115 L30,85 L85,85 Z',
        // Triangle
        'M100,40 L160,160 L40,160 Z'
      ];

      let currentIndex = 0;

      const morphInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % shapes.length;
        morphShape(pathRef.current!, shapes[currentIndex], {
          duration: 1.5,
          ease: 'power2.inOut'
        });
      }, 3000);

      return () => clearInterval(morphInterval);
    }
  }, []);

  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={pathRef}
        d="M100,50 A50,50 0 1,1 100,150 A50,50 0 1,1 100,50"
        fill="currentColor"
        opacity="0.8"
      />
    </svg>
  );
}
