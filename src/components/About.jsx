import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import './About.css';
import MagicRings from './MagicRings';

const About = forwardRef((props, ref) => {
  const sectionRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const setSectionNode = useCallback((node) => {
    sectionRef.current = node;

    if (typeof ref === 'function') {
      ref(node);
      return;
    }

    if (ref) {
      ref.current = node;
    }
  }, [ref]);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        isMobile: window.innerWidth < 768
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateReducedMotion = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updateReducedMotion();
    mediaQuery.addEventListener('change', updateReducedMotion);

    return () => {
      mediaQuery.removeEventListener('change', updateReducedMotion);
    };
  }, []);

  const scaleFactor = Math.min(Math.max(dimensions.width / 1200, 0.4), 1.0);
  // DeferredSection in HomePage already ensures this component only mounts when visible,
  // so no extra IntersectionObserver is needed here.
  const canRenderMagicRings = !prefersReducedMotion;

  return (
    <section 
      ref={setSectionNode} 
      id="about" 
      className="about-section min-h-[70vh] md:min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center bg-black px-6 py-16 md:py-0"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, rgba(18,18,18,0.82) 58%, rgba(0,0,0,1) 100%)',
          }}
          aria-hidden="true"
        />

        {canRenderMagicRings ? (
            <MagicRings
              color="#ffffff"
              ringCount={dimensions.isMobile ? 5 : 8}
              speed={0.45}
              attenuation={dimensions.isMobile ? 6.5 : 5}
              lineThickness={dimensions.isMobile ? 1.2 : 2}
              baseRadius={dimensions.isMobile ? 0.38 : 0.3 * (1 / scaleFactor)}
              radiusStep={dimensions.isMobile ? 0.12 : 0.15 * scaleFactor}
              scaleRate={dimensions.isMobile ? 0.08 : 0.1}
              opacity={dimensions.isMobile ? 0.2 : 0.25}
              noiseAmount={dimensions.isMobile ? 0.05 : 0.08}
              rotation={0}
              ringGap={1.5}
              fadeIn={0.7}
              fadeOut={0.5}
              clickBurst={false}
              followMouse={false}
              mouseInfluence={0}
              hoverScale={1}
              parallax={0}
            />
        ) : null}
      </div>

      <div className="relative z-10 w-full flex flex-col items-center pointer-events-none">
        <div className="about-header text-center mb-8 md:mb-20">
          <h2 className="about-title text-5xl md:text-9xl font-black uppercase tracking-wider text-white mb-2">
            About Us
          </h2>
        </div>

        <p className="about-paragraph text-center text-base md:text-3xl text-gray-200 leading-relaxed max-w-4xl mx-auto px-4">
          Acunetix 13.0 is a flagship event organised by ACES and CSI, offering
          a range of Tech &amp; Non-Tech events. Participants take part in
          diverse competitions, showcasing their skills and earning recognition.
          With exciting prizes and a mix of solo and team events, it&apos;s a
          unique opportunity for students to shine and be part of an
          unforgettable experience.
        </p>
      </div>

    </section>
  );
});

About.displayName = 'About';
export default About;