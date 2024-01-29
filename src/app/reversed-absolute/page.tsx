'use client';

import YellowVector from '@/SVG/YellowVector';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const ShapeComponent = () => {
  return (
    <div className='relative w-64 h-64 rounded-full bg-yellow-400 m-8 clip-star'>
      <div className='absolute inset-0  bg-yellow-400'></div>
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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.circle-animate',
          start: 'top 90%',
          end: 'bottom 0',
          scrub: 1,
          toggleActions: 'restart none none reset',
          markers: true,
        },
      });
      tl.to('.circle-animate', {
        scale: 1,
        delay: 0.02,
        ease: 'power2.out',
      });
      tl.to('.circle-animate img', {
        scale: 1,
        // delay: 0.02,
        ease: 'power2.out',
      },0);

      return () => {};
    });

    return () => ctx.revert();
  }, [windowWidth]);

  return (
    <div ref={mainRef}>
      <div className='h-screen bg-red-500'></div>
      <div
        ref={svgRef}
        className='h-[100vh] circle-animate-parent flex items-center justify-center overflow-hidden relative bg-slate-300'
      >
        {/* <div
          className="h-[300%] bg-size-mobile md:bg-size-desktop  aspect-square bg-no-repeat bg-center rounded-full circle-animate"
          style={{
            backgroundImage: 'url("/crepaway1.jfif")',
          }}
        ></div> */}
        <div className='circle-animate bg-yellow-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[142vmax] w-[142vmax] scale-[0.2] overflow-hidden'>
          <img
            src='/crepaway1.jfif'
            className='img-animate w-full h-full object-contain'
          />
        </div>
        {/* <YellowVector className='circle-animate w-[500px] aspect-square'/> */}
        {/* <img src="https://picsum.photos/1500" className="w-full h-full" /> */}
      </div>
      <div className='h-screen'>
        <div className='w-[10px] aspect-square'>
          {/* <YellowVector className=''/>  */}
          <ShapeComponent />
        </div>
      </div>
    </div>
  );
}
