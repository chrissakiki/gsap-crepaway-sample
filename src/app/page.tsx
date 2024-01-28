'use client';

import  YellowVector  from '@/SVG/YellowVector';
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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.circle-animate',
          start: 'top 100%',
          end: 'top 0',
          scrub: 1,
          toggleActions: 'restart none none reset',
          markers: true,
        },
      });
      tl.to(svgRef?.current!.querySelector('ellipse'), {
        // width: '100%',
        // height: '100%',
        duration: 1,
        attr: { rx: '248', ry: '248' }, 
        ease: 'power2.out',
        delay: 0.2
      })
      // tl.to('.circle-animate', {

      //   // width: '100%',
      //   // height: '100%',
      //   borderRadius: '20px',
      //   duration: 1,
      //   delay: 0.02,
      //   ease: 'power2.out',
      // })
    }, mainRef);

    return () => ctx.revert();

  }, [windowWidth]);

  return (
    <div ref={mainRef}>
      <div className='h-screen bg-red-500'></div>
      <div  ref={svgRef} className=' h-screen circle-animate-parent flex items-center justify-center'>
        {/* <div className='w-[100px] h-[100px] aspect-square bg-green-500 rounded-[0] circle-animate'></div> */}
        <YellowVector className='circle-animate w-[500px] aspect-square'/>
      </div>
      <div className="h-screen">
       <div className="w-[10px] aspect-square">
       {/* <YellowVector className=''/>  */}
       <ShapeComponent/>
       </div>
      </div>
    </div>
  );
}
