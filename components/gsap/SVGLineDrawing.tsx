'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SVGLineDrawingProps {
  className?: string;
}

export default function SVGLineDrawing({ className = '' }: SVGLineDrawingProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll('path');
      
      paths.forEach((path) => {
        const length = path.getTotalLength();
        
        // Set up the starting positions
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
        
        // Animate the path
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: path,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }
  }, []);

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 100 L100 50 L150 100 L100 150 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="100"
        cy="100"
        r="40"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
    </svg>
  );
}
