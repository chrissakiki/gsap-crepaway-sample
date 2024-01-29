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
          let { isDesktop, isMobile, reduceMotion } = context.conditions;

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
          tl.from('.circle-animate', {
            width: isDesktop ? '500px' : '200px',
            height: isDesktop ? '500px' : '200px',
            delay: 0.02,
            backgroundSize: isDesktop ? '300%' : '320%',
            ease: 'power2.out',
            // borderRadius: '50%',
            // delay: 0.2,
          });
          // tl.to('.circle-animate', {

          //   // width: '100%',
          //   // height: '100%',
          //   borderRadius: '20px',
          //   duration: 1,
          //   ease: 'power2.out',
          // })
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
      <div
        ref={svgRef}
        className="h-[70vh] md:h-[90vh] circle-animate-parent flex items-center justify-center overflow-hidden"
      >
        <div
          className="h-[300%] bg-size-mobile md:bg-size-desktop  aspect-square bg-no-repeat bg-center rounded-full circle-animate"
          style={{
            backgroundImage: 'url("/crepaway1.jfif")',
          }}
        ></div>
        {/* <YellowVector className='circle-animate w-[500px] aspect-square'/> */}
        {/* <img src="https://picsum.photos/1500" className="w-full h-full" /> */}
      </div>
      <div className="h-screen">
        <div className="w-[10px] aspect-square">
          {/* <YellowVector className=''/>  */}
          <ShapeComponent />
        </div>
      </div>
    </div>
  );
}
