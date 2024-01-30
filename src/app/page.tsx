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
      let mm = gsap?.matchMedia();
      const breakPoint = 768;
      mm.add(
        {
          isDesktop: `(min-width: ${breakPoint}px)`,
          isMobile: `(max-width: ${breakPoint}px)`,
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          if (!context.conditions) return;
          let { isDesktop } = context.conditions;
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: '.circle-animate',
              start: 'top 90%',
              end: 'top 0',
              scrub: 1,
              toggleActions: 'restart none none reset',
              markers: true,
            },
          });
          tl.to('.circle-animate', {
            // width: isDesktop ? '500px' : '200px',
            // height: isDesktop ? '500px' : '200px',
            scale: 1,
            // delay: isDesktop ? 0.02 : 0,
            ease: 'power2.out',
          });
          // .to(
          //   '.vector',
          //   {
          //     opacity: 0,
          //     duration: 0.1,
          //   },
          //   10
          // );
        },
        mainRef
      );
    }, mainRef);

    return () => ctx.revert();
  }, [windowWidth]);

  return (
    <div ref={mainRef}>
      <div className="h-screen bg-red-500"></div>
      <div className="h-screen relative overflow-hidden ">
        <div className="h-[142vmax] w-[142vmax] absolute circle-animate rounded-full scale-[0.1] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
          <div className="bg-[#F2CA45] absolute inset-[4%] rounded-full"></div>
          <YellowVector className="absolute inset-0" />
        </div>
      </div>
      <div className="h-screen"></div>
    </div>
  );
}
