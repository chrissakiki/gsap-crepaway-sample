'use client';

import YellowVector from '@/SVG/YellowVector';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const ShapeComponent = () => {
  return (
    <div className="relative w-64 h-64 rounded-full bg-yellow-400 m-8 clip-star">
      <div className="absolute inset-0  bg-yellow-400"></div>
    </div>
  );
};

export default function Home() {
  const mainRef = useRef(null);
  const svgRef = useRef<HTMLDivElement>(null);

  const [windowWidth, setWindowWidth] = useState<number>();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const mdBreakPoint = 768;

      mm.add(
        {
          isDesktop: `(min-width: ${mdBreakPoint}px)`,
          isMobile: `(max-width: ${mdBreakPoint}px)`,
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          if (!context.conditions) return;
          let { isDesktop, isMobile, reduceMotion } = context.conditions;
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: '.clippedImage',
              start: 'top 90%',
              end: 'bottom 0',
              scrub: 1,
              toggleActions: 'restart none none reset',
              markers: true,
            },
          });
          tl.to('.clippedImage', {
            clipPath: 'circle(100% at 50% 50%)',
            delay: 0.2,
            ease: 'power2.out',
          });
          tl.to(
            '.clippedImage',
            {
              scale: 1.15,
            },
            0.4
          );
        },
        mainRef
      );

      return () => {};
    });

    return () => ctx.revert();
  }, [windowWidth]);

  return (
    <div ref={mainRef}>
      <div className="h-screen bg-red-500"></div>
      <div className="h-[70vh] md:h-[90vh] circle-animate flex items-center justify-center overflow-hidden relative bg-white">
        <img
          src="/crepaway1.jfif"
          className="clippedImage w-full h-full object-cover"
        />
      </div>
      <div className="h-screen"></div>
    </div>
  );
}
