import React, { forwardRef, useState, useEffect } from 'react';
import heroVideo from '../assets/Hero.mp4';

// Updated logic: if the date is in the past, it returns all zeros
const TARGET_DATE = new Date('2026-03-07T00:00:00+05:30').getTime();

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
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={ref} className="relative w-full min-h-screen h-[100dvh] overflow-hidden flex items-center justify-center">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Darker semi-transparent overlay */}
      <div className="absolute inset-0 w-full h-full bg-black/40 z-10 pointer-events-none" />
      {/* Centered content above video/overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 w-full px-4">
  <h1
  className="w-full text-white font-[Audiowide,Arial,sans-serif] font-normal uppercase leading-none drop-shadow-2xl"
  style={{ 
    /* clamp(minimum, preferred, maximum) */
    fontSize: 'clamp(2rem, 11vw, 12rem)', 
    textAlign: 'center',
    width: '100%',
    display: 'block',
    whiteSpace: 'nowrap' // Keeps it on one line
  }}
>
  ACUNETIX 13.0
</h1>
        <div className="mt-8 md:mt-16 w-full flex flex-col items-center">
          <span className="block text-base md:text-2xl font-semibold text-white/80 tracking-widest mb-2 uppercase">
            {Date.now() > TARGET_DATE ? "Event is Live" : "Event Starts In"}
          </span>
          <div
            className="inline-block text-2xl md:text-5xl font-mono font-bold text-white bg-black/60 backdrop-blur-sm rounded-lg px-6 py-4 shadow-2xl border border-white/10"
            key={`${timeLeft.days}-${timeLeft.seconds}`}
            style={{ width: 'fit-content', minWidth: '220px', textAlign: 'center' }}
          >
            {pad(timeLeft.days)}:{pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
export default Hero;
