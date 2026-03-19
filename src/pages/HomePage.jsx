import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

const About = lazy(() => import('@/components/About'));
const Event = lazy(() => import('@/components/Event'));
const Reel = lazy(() => import('@/components/Reel'));

const sectionRefByState = {
  hero: 'heroRef',
  about: 'aboutRef',
  events: 'eventRef',
  schedule: 'scheduleRef',
  sponsors: 'sponsorsRef',
  reel: 'reelRef',
};

function DeferredSection({
  id,
  sectionRef,
  minHeightClassName = 'min-h-screen',
  rootMargin = '120px 0px',
  children,
}) {
  const [shouldRender, setShouldRender] = useState(false);
  const sentinelRef = useRef(null);

  const setCombinedRef = useCallback(
    (node) => {
      sentinelRef.current = node;
      if (sectionRef && typeof sectionRef === 'object') {
        sectionRef.current = node;
      }
    },
    [sectionRef],
  );

  useEffect(() => {
    if (shouldRender) return;

    const node = sentinelRef.current;
    if (!node) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  if (!shouldRender) {
    return (
      <section
        id={id}
        ref={setCombinedRef}
        className={`w-full bg-black ${minHeightClassName}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <Suspense
      fallback={
        <section
          id={id}
          ref={setCombinedRef}
          className={`w-full bg-black ${minHeightClassName}`}
          aria-hidden="true"
        />
      }
    >
      {children}
    </Suspense>
  );
}

function HomePage({ scrollToRefs, scrollToSection, isScrolled }) {
  const location = useLocation();

  useEffect(() => {
    const scrollTarget = location.state?.scrollToEvents ? 'events' : location.state?.scrollTo;
    if (!scrollTarget) return;

    const refKey = sectionRefByState[scrollTarget];
    const targetRef = refKey ? scrollToRefs?.[refKey] : null;
    if (!targetRef?.current) return;

    const timeoutId = window.setTimeout(() => {
      const reduceMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      targetRef.current.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      });
      window.history.replaceState({}, document.title, `${window.location.pathname}${window.location.search}`);
    }, 50);

    return () => window.clearTimeout(timeoutId);
  }, [
    location.state,
    scrollToRefs?.heroRef,
    scrollToRefs?.aboutRef,
    scrollToRefs?.eventRef,
    scrollToRefs?.scheduleRef,
    scrollToRefs?.sponsorsRef,
    scrollToRefs?.reelRef,
  ]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar
          scrollToRefs={scrollToRefs}
          scrollToSection={scrollToSection}
          isScrolled={isScrolled}
        />

        <main className="grow bg-black">
          <Hero ref={scrollToRefs.heroRef} />

          <DeferredSection
            id="about"
            sectionRef={scrollToRefs.aboutRef}
            minHeightClassName="min-h-[70vh] md:min-h-screen"
            rootMargin="0px 0px"
          >
            <About ref={scrollToRefs.aboutRef} />
          </DeferredSection>

          <DeferredSection
            id="events"
            sectionRef={scrollToRefs.eventRef}
            minHeightClassName="min-h-screen"
            rootMargin="140px 0px"
          >
            <Event ref={scrollToRefs.eventRef} />
          </DeferredSection>

          <DeferredSection
            id="reel"
            sectionRef={scrollToRefs.reelRef}
            minHeightClassName="min-h-[70vh]"
            rootMargin="180px 0px"
          >
            <Reel ref={scrollToRefs.reelRef} />
          </DeferredSection>
        </main>

        <Footer
          scrollToRefs={scrollToRefs}
          scrollToSection={scrollToSection}
        />
      </div>
    </>
  );
}

export default HomePage;
