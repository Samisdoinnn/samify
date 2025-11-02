'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalScrollSectionProps {
  children: ReactNode[];
  className?: string;
}

export default function HorizontalScrollSection({ 
  children, 
  className = '' 
}: HorizontalScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const panels = scrollerRef.current.children;
      
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => `+=${scrollerRef.current!.offsetWidth}`
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [children]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div 
        ref={scrollerRef} 
        className="flex"
        style={{ width: `${children.length * 100}vw` }}
      >
        {children.map((child, index) => (
          <div 
            key={index} 
            className="w-screen flex-shrink-0"
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
