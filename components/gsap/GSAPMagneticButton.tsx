'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { magneticButton } from '@/lib/gsap-animations';

interface GSAPMagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
}

export default function GSAPMagneticButton({ 
  children, 
  className = '',
  onClick,
  strength = 0.3
}: GSAPMagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      const cleanup = magneticButton(buttonRef.current, strength);
      return cleanup;
    }
  }, [strength]);

  return (
    <button ref={buttonRef} className={className} onClick={onClick}>
      {children}
    </button>
  );
}
