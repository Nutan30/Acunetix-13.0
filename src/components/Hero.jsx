import React, { forwardRef, useState, useEffect } from 'react';
import heroVideoWebm from '../assets/bg.webm'; 

const TARGET_DATE = new Date('2026-03-27T00:00:00+05:30').getTime();

function getTimeLeft() {
  const now = Date.now();
  const diff = Math.max(TARGET_DATE - now, 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n) {
  return String(n).padStart(2, '0');
}

const Hero = forwardRef((props, ref) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const reduceMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const connection =
      navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const saveData = Boolean(connection?.saveData);
    const effectiveType = connection?.effectiveType || '';
    const slowConnection = /2g/.test(effectiveType);
    const isMobileViewport = window.innerWidth < 768;
    const mobileFastNetwork = effectiveType === '' || /4g/.test(effectiveType);



    if (reduceMotion || saveData || slowConnection) {
      return undefined;
    }

    const enableVideo = () => {
      setShouldLoadVideo(true);
    };

    if (isMobileViewport) {
      if (!mobileFastNetwork) {
        return undefined;
      }

      const interactionEvents = ['pointerdown', 'touchstart', 'keydown'];

      const cleanupListeners = () => {
        interactionEvents.forEach((eventName) => {
          window.removeEventListener(eventName, onFirstInteraction);
        });
      };

      const onFirstInteraction = () => {
        cleanupListeners();
        enableVideo();
      };

      interactionEvents.forEach((eventName) => {
        window.addEventListener(eventName, onFirstInteraction, { passive: true });
      });

      // Keep video opt-in for mobile to protect first load responsiveness.
      const timeoutId = window.setTimeout(() => {
        cleanupListeners();
      }, 20000);

      return () => {
        cleanupListeners();
        window.clearTimeout(timeoutId);
      };
    }

    let timeoutId = null;
    let idleId = null;

    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(enableVideo, { timeout: 5000 });
    } else {
      timeoutId = window.setTimeout(enableVideo, 4000);
    }

    return () => {
      if (idleId !== null && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  const TimerUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg w-16 h-16 md:w-24 md:h-24 flex items-center justify-center mb-2 shadow-2xl">
        <span className="text-2xl md:text-5xl font-mono font-bold text-white">
          {pad(value)}
        </span>
      </div>
      <span className="text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] text-emerald-200">
        {label}
      </span>
    </div>
  );

  return (
    <section ref={ref} className="relative w-full min-h-screen h-dvh overflow-hidden flex items-center justify-center bg-black">
      {shouldLoadVideo ? (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          aria-hidden="true"
        >
          <source src={heroVideoWebm} type="video/webm" />
        </video>
      ) : (
        <div
          className="absolute inset-0 w-full h-full z-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(22, 163, 74, 0.25) 0%, rgba(15, 23, 42, 0.88) 55%, #000000 100%)',
          }}
          aria-hidden="true"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 w-full h-full bg-black/40 z-10 pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 w-full px-4">
        {/* Main Heading */}
        <h1
          className="w-full text-white font-[Audiowide,cursive] font-normal uppercase leading-none"
          style={{ 
            fontSize: 'clamp(2.5rem, 11vw, 12rem)', 
            textAlign: 'center',
            width: '100%',
            display: 'block',
            whiteSpace: 'nowrap',
            textShadow: 'none'
          }}
        >
          ACUNETIX 13.0
        </h1>

        <p className="im-fell-pica text-white/90 tracking-[0.15em] mt-2 mb-8">
  Where the Journey is the Challenge
</p>
        
        <div className="mt-4 md:mt-8 w-full flex flex-col items-center">
          <span className="block text-sm md:text-xl font-semibold text-white/70 tracking-[0.4em] mb-8 uppercase">
            {Date.now() > TARGET_DATE ? "Event is Live" : "Game Begins In"}
          </span>

          <div className="flex gap-3 md:gap-6 justify-center items-center">
            <TimerUnit value={timeLeft.days} label="Days" />
            <TimerUnit value={timeLeft.hours} label="Hours" />
            <TimerUnit value={timeLeft.minutes} label="Mins" />
            <TimerUnit value={timeLeft.seconds} label="Secs" />
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
export default Hero;