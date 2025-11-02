'use client';

import { useEffect, useRef } from 'react';
import GSAPTextReveal from '@/components/gsap/GSAPTextReveal';
import GSAPScrollReveal from '@/components/gsap/GSAPScrollReveal';
import GSAPMagneticButton from '@/components/gsap/GSAPMagneticButton';
import GSAPParallax from '@/components/gsap/GSAPParallax';
import GSAPTiltCard from '@/components/gsap/GSAPTiltCard';
import GSAPStaggerGrid from '@/components/gsap/GSAPStaggerGrid';
import HorizontalScrollSection from '@/components/gsap/HorizontalScrollSection';
import SVGLineDrawing from '@/components/gsap/SVGLineDrawing';
import MorphingShape from '@/components/gsap/MorphingShape';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function AnimationsDemo() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Page Transition on mount
    if (pageRef.current) {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 50, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power4.out' }
      );
    }
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen">
      {/* Hero Section - Animation #1, #2, #4 */}
      <section className="relative h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* #4 Parallax Background */}
        <GSAPParallax speed={0.5} className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        </GSAPParallax>

        <div className="container-custom h-full flex flex-col items-center justify-center relative z-10">
          {/* #2 Text Reveal Animation */}
          <GSAPTextReveal className="text-6xl md:text-8xl font-bold text-center mb-8">
            All 10 GSAP Animations
          </GSAPTextReveal>

          <GSAPScrollReveal delay={0.5}>
            <p className="text-xl text-center max-w-2xl mb-8">
              Expert-level animations implemented with GreenSock Animation Platform
            </p>
          </GSAPScrollReveal>

          {/* #5 Magnetic Button */}
          <GSAPMagneticButton 
            className="bg-white text-purple-900 px-8 py-4 rounded-full font-bold text-lg"
            strength={0.4}
          >
            Explore Animations
          </GSAPMagneticButton>
        </div>
      </section>

      {/* Animation #3 - Scroll Triggered */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <GSAPScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-4">Scroll-Triggered Animations</h2>
            <p className="text-center text-gray-600 mb-12">Elements animate as you scroll</p>
          </GSAPScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <GSAPScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-8 rounded-2xl text-white">
                  <h3 className="text-2xl font-bold mb-4">Feature {i}</h3>
                  <p>This card animates when it enters the viewport with ScrollTrigger</p>
                </div>
              </GSAPScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Animation #6 - Morphing Shapes */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <GSAPScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-4">Morphing Shapes</h2>
            <p className="text-center text-gray-600 mb-12">SVG path morphing with smooth transitions</p>
          </GSAPScrollReveal>

          <div className="flex justify-center">
            <MorphingShape className="w-64 h-64 text-purple-600" />
          </div>
        </div>
      </section>

      {/* Animation #7 - Staggered Grid */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <GSAPScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-4">Staggered Grid Animations</h2>
            <p className="text-center text-gray-600 mb-12">Sequential animation with cascading timing</p>
          </GSAPScrollReveal>

          <GSAPStaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-6" stagger={0.1}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center text-white text-4xl font-bold">
                {i + 1}
              </div>
            ))}
          </GSAPStaggerGrid>
        </div>
      </section>

      {/* Animation #8 - Horizontal Scrolling */}
      <section className="py-20 bg-gray-900">
        <div className="container-custom mb-12">
          <GSAPScrollReveal>
            <h2 className="text-4xl font-bold text-center text-white mb-4">Horizontal Scrolling Panels</h2>
            <p className="text-center text-gray-400 mb-8">Scroll vertically to move horizontally</p>
          </GSAPScrollReveal>
        </div>

        <HorizontalScrollSection>
          {[
            { title: 'Panel 1', color: 'from-red-500 to-pink-500' },
            { title: 'Panel 2', color: 'from-blue-500 to-cyan-500' },
            { title: 'Panel 3', color: 'from-green-500 to-emerald-500' },
            { title: 'Panel 4', color: 'from-purple-500 to-indigo-500' }
          ].map((panel, i) => (
            <div key={i} className={`h-screen flex items-center justify-center bg-gradient-to-br ${panel.color}`}>
              <h3 className="text-6xl font-bold text-white">{panel.title}</h3>
            </div>
          ))}
        </HorizontalScrollSection>
      </section>

      {/* Animation #9 - 3D Card Tilt */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <GSAPScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-4">3D Card Tilt</h2>
            <p className="text-center text-gray-600 mb-12">Hover over cards for 3D perspective effect</p>
          </GSAPScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <GSAPTiltCard key={i} className="bg-gradient-to-br from-indigo-500 to-purple-500 p-8 rounded-2xl text-white" maxTilt={15}>
                <div className="aspect-video bg-white/20 rounded-lg mb-4"></div>
                <h3 className="text-2xl font-bold mb-2">3D Card {i}</h3>
                <p>Move your mouse over this card to see the 3D tilt effect</p>
              </GSAPTiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Animation #10 - SVG Line Drawing */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <GSAPScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-4">SVG Line Drawing</h2>
            <p className="text-center text-gray-600 mb-12">Lines draw themselves as you scroll</p>
          </GSAPScrollReveal>

          <div className="flex justify-center gap-12">
            <SVGLineDrawing className="w-48 h-48 text-blue-600" />
            <SVGLineDrawing className="w-48 h-48 text-purple-600" />
            <SVGLineDrawing className="w-48 h-48 text-pink-600" />
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="container-custom">
          <GSAPScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-12">All 10 Animations Implemented</h2>
          </GSAPScrollReveal>

          <GSAPStaggerGrid className="grid md:grid-cols-2 gap-6" stagger={0.08}>
            {[
              '1. Smooth Page Transitions - Timeline-based enter/exit',
              '2. Text Reveal / Split Text - Word-by-word with 3D rotation',
              '3. Scroll-Triggered Animations - ScrollTrigger plugin',
              '4. Parallax Scrolling - Multi-layer depth with scrub',
              '5. Magnetic Buttons - Elastic cursor-following',
              '6. Morphing Shapes - SVG path morphing',
              '7. Staggered Grid - Sequential cascading animations',
              '8. Horizontal Scrolling - Pin and scrub panels',
              '9. 3D Card Tilt - Perspective-based rotation',
              '10. SVG Line Drawing - Stroke-dasharray animation'
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <p className="text-lg">{item}</p>
              </div>
            ))}
          </GSAPStaggerGrid>
        </div>
      </section>
    </div>
  );
}
