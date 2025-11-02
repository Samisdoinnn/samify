import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 1. Smooth Page Transitions
export const pageTransition = {
  enter: (element: HTMLElement) => {
    const tl = gsap.timeline();
    tl.fromTo(
      element,
      { opacity: 0, y: 50, scale: 0.98 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.8, 
        ease: 'power4.out',
        clearProps: 'all'
      }
    );
    return tl;
  },
  exit: (element: HTMLElement) => {
    const tl = gsap.timeline();
    tl.to(element, {
      opacity: 0,
      y: -30,
      scale: 0.98,
      duration: 0.5,
      ease: 'power4.in'
    });
    return tl;
  }
};

// 2. Text Reveal / Split Text Animation
export const splitTextReveal = (element: HTMLElement, options = {}) => {
  const defaults = {
    duration: 1,
    stagger: 0.08,
    ease: 'back.out(1.7)',
    delay: 0
  };
  const opts = { ...defaults, ...options };

  // Split text into words
  const text = element.textContent || '';
  const words = text.split(' ');
  element.innerHTML = words
    .map(word => `<span class="word" style="display: inline-block; overflow: hidden;"><span style="display: inline-block;">${word}</span></span>`)
    .join(' ');

  const wordSpans = element.querySelectorAll('.word span');
  
  gsap.fromTo(
    wordSpans,
    { 
      y: 100, 
      opacity: 0,
      rotationX: -90
    },
    {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: opts.duration,
      stagger: opts.stagger,
      ease: opts.ease,
      delay: opts.delay
    }
  );
};

// 3. Scroll-Triggered Animations
export const scrollReveal = (elements: string | HTMLElement | HTMLElement[], options = {}) => {
  const defaults = {
    trigger: elements,
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
    markers: false
  };
  const opts = { ...defaults, ...options };

  gsap.fromTo(
    elements,
    { 
      opacity: 0, 
      y: 100,
      scale: 0.9
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: opts
    }
  );
};

// 4. Parallax Scrolling
export const parallaxScroll = (element: HTMLElement, speed = 0.5) => {
  gsap.to(element, {
    yPercent: -50 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
};

// 5. Magnetic Button / Hover Effects
export const magneticButton = (button: HTMLElement, strength = 0.3) => {
  const handleMouseMove = (e: MouseEvent) => {
    const { left, top, width, height } = button.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(button, {
      x: deltaX,
      y: deltaY,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  button.addEventListener('mousemove', handleMouseMove);
  button.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    button.removeEventListener('mousemove', handleMouseMove);
    button.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// 6. Morphing Shapes (SVG Path Morphing)
export const morphShape = (element: SVGPathElement, targetPath: string, options = {}) => {
  const defaults = {
    duration: 1.5,
    ease: 'power2.inOut',
    repeat: 0,
    yoyo: false
  };
  const opts = { ...defaults, ...options };

  const originalPath = element.getAttribute('d') || '';
  
  gsap.to(element, {
    attr: { d: targetPath },
    duration: opts.duration,
    ease: opts.ease,
    repeat: opts.repeat,
    yoyo: opts.yoyo,
    onComplete: () => {
      if (!opts.yoyo && opts.repeat === 0) {
        element.setAttribute('d', targetPath);
      }
    }
  });

  return () => {
    element.setAttribute('d', originalPath);
  };
};

// 7. Staggered Grid Animations
export const staggerGrid = (items: string | HTMLElement[], options = {}) => {
  const defaults = {
    stagger: 0.1,
    duration: 0.8,
    ease: 'power4.out',
    from: 'start'
  };
  const opts = { ...defaults, ...options };

  gsap.fromTo(
    items,
    {
      opacity: 0,
      y: 60,
      scale: 0.8,
      rotationX: -15
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationX: 0,
      duration: opts.duration,
      stagger: {
        amount: opts.stagger,
        from: opts.from as any,
        grid: 'auto' as any,
        ease: 'power2.inOut'
      },
      ease: opts.ease,
      scrollTrigger: {
        trigger: items,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    }
  );
};

// 8. Horizontal Scrolling Panels
export const horizontalScroll = (container: HTMLElement, panels: HTMLElement[]) => {
  const totalWidth = panels.reduce((acc, panel) => acc + panel.offsetWidth, 0);
  
  gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      snap: 1 / (panels.length - 1),
      end: () => `+=${totalWidth}`
    }
  });
};

// 9. 3D Card or Image Tilt
export const cardTilt3D = (card: HTMLElement, maxTilt = 15) => {
  const handleMouseMove = (e: MouseEvent) => {
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    const rotateY = (x - 0.5) * maxTilt;
    const rotateX = (0.5 - y) * maxTilt;

    gsap.to(card, {
      rotationY: rotateY,
      rotationX: rotateX,
      transformPerspective: 1000,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)'
    });
  };

  card.addEventListener('mousemove', handleMouseMove);
  card.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    card.removeEventListener('mousemove', handleMouseMove);
    card.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Fade in animation with stagger
export const fadeInStagger = (elements: string | HTMLElement[], delay = 0) => {
  gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      delay
    }
  );
};

// Scale in animation
export const scaleIn = (element: HTMLElement, options = {}) => {
  const defaults = {
    duration: 0.6,
    ease: 'back.out(1.7)',
    delay: 0
  };
  const opts = { ...defaults, ...options };

  gsap.fromTo(
    element,
    { scale: 0, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: opts.duration,
      ease: opts.ease,
      delay: opts.delay
    }
  );
};

// Slide in from direction
export const slideIn = (element: HTMLElement, direction: 'left' | 'right' | 'top' | 'bottom' = 'bottom') => {
  const directions = {
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
    top: { x: 0, y: -100 },
    bottom: { x: 0, y: 100 }
  };

  const { x, y } = directions[direction];

  gsap.fromTo(
    element,
    { x, y, opacity: 0 },
    {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power4.out'
    }
  );
};

// Infinite rotation animation
export const infiniteRotate = (element: HTMLElement, duration = 20) => {
  gsap.to(element, {
    rotation: 360,
    duration,
    ease: 'none',
    repeat: -1
  });
};

// Pulse animation
export const pulse = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 1.05,
    duration: 1,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1
  });
};

// 10. SVG Line Drawing Animation
export const drawSVGLine = (path: SVGPathElement, options = {}) => {
  const defaults = {
    duration: 2,
    ease: 'power2.inOut',
    delay: 0,
    scrollTrigger: null
  };
  const opts = { ...defaults, ...options };

  const length = path.getTotalLength();
  
  // Set up the starting positions
  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length
  });
  
  // Animate the path
  const animation = gsap.to(path, {
    strokeDashoffset: 0,
    duration: opts.duration,
    ease: opts.ease,
    delay: opts.delay,
    scrollTrigger: opts.scrollTrigger
  });

  return animation;
};
