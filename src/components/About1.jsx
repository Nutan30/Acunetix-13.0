import React, { forwardRef, useEffect, useRef } from 'react';
import './About.css';

const About = forwardRef((props, ref) => {
  const contentRef = useRef(null);
  const canvasRef = useRef(null);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const animatedEls = contentRef.current?.querySelectorAll('.about-animate');
    animatedEls?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Canvas-based laser beams + fog
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Random continuous laser system ────────────────
    // Each beam has a lifecycle: spawn → fall → hold → fade → respawn
    const BEAM_COUNT = 8;
    const BEAM_LIFE = 4;       // seconds for full lifecycle
    const FALL_PHASE = 0.35;   // 0-35% = falling
    const HOLD_PHASE = 0.7;    // 35-70% = holding
    // 70-100% = fading out

    function randomBeam(startTime) {
      return {
        x: 0.05 + Math.random() * 0.9,
        targetY: 0.33 + Math.random() * 0.12,   // rooftop zone 33-45%
        w: 0.8 + Math.random() * 1.5,
        hue: 148 + Math.random() * 20,
        opacity: 0.18 + Math.random() * 0.14,
        birthTime: startTime,
        life: BEAM_LIFE + Math.random() * 1.5,
      };
    }

    // Stagger initial beams
    const beams = [];
    for (let i = 0; i < BEAM_COUNT; i++) {
      beams.push(randomBeam(-i * (BEAM_LIFE / BEAM_COUNT)));
    }

    function drawBeam(b, t) {
      const W = canvas.width;
      const H = canvas.height;
      const bx = b.x * W;
      const startY = 0;
      const endY = b.targetY * H;

      const age = t - b.birthTime;
      if (age < 0) return;
      const progress = age / b.life;
      if (progress > 1) return; // dead, will be respawned

      // Phase calculations
      let beamLength = 0;
      let fadeAlpha = 1;

      if (progress < FALL_PHASE) {
        // Falling phase
        beamLength = easeOutCubic(progress / FALL_PHASE);
      } else if (progress < HOLD_PHASE) {
        // Holding phase
        beamLength = 1;
      } else {
        // Fading phase
        beamLength = 1;
        fadeAlpha = 1 - easeOutCubic((progress - HOLD_PHASE) / (1 - HOLD_PHASE));
      }

      const currentEndY = startY + (endY - startY) * beamLength;

      // Flicker
      const flicker = 0.85 + 0.15 * Math.sin(t * 6.3 + b.x * 50) *
        Math.sin(t * 9.1 + b.x * 30);
      const alpha = b.opacity * flicker * fadeAlpha;

      if (alpha < 0.005) return;

      // ── Core beam ─────────────
      const coreGrad = ctx.createLinearGradient(bx, startY, bx, currentEndY);
      coreGrad.addColorStop(0, `hsla(${b.hue}, 100%, 85%, 0)`);
      coreGrad.addColorStop(0.05, `hsla(${b.hue}, 100%, 85%, ${alpha * 0.3})`);
      coreGrad.addColorStop(0.5, `hsla(${b.hue}, 100%, 90%, ${alpha * 0.5})`);
      coreGrad.addColorStop(1, `hsla(${b.hue}, 100%, 95%, ${alpha * 0.5})`);

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.beginPath();
      ctx.moveTo(bx - b.w * 0.5, startY);
      ctx.lineTo(bx + b.w * 0.5, startY);
      ctx.lineTo(bx + b.w * 0.5, currentEndY);
      ctx.lineTo(bx - b.w * 0.5, currentEndY);
      ctx.closePath();
      ctx.fillStyle = coreGrad;
      ctx.fill();
      ctx.restore();

      // ── Outer glow ─────────────
      const glowW = b.w * 16;
      const glowGrad = ctx.createLinearGradient(bx, startY, bx, currentEndY);
      glowGrad.addColorStop(0, `hsla(${b.hue}, 80%, 60%, 0)`);
      glowGrad.addColorStop(0.1, `hsla(${b.hue}, 80%, 60%, ${alpha * 0.03})`);
      glowGrad.addColorStop(0.5, `hsla(${b.hue}, 80%, 60%, ${alpha * 0.05})`);
      glowGrad.addColorStop(1, `hsla(${b.hue}, 80%, 60%, ${alpha * 0.06})`);

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.beginPath();
      ctx.moveTo(bx - glowW, startY);
      ctx.lineTo(bx + glowW, startY);
      ctx.lineTo(bx + glowW * 0.6, currentEndY);
      ctx.lineTo(bx - glowW * 0.6, currentEndY);
      ctx.closePath();
      ctx.fillStyle = glowGrad;
      ctx.fill();
      ctx.restore();

      // ── Mid glow ─────────────
      const midW = b.w * 7;
      const midGrad = ctx.createLinearGradient(bx, startY, bx, currentEndY);
      midGrad.addColorStop(0, `hsla(${b.hue}, 90%, 70%, 0)`);
      midGrad.addColorStop(0.15, `hsla(${b.hue}, 90%, 70%, ${alpha * 0.05})`);
      midGrad.addColorStop(0.6, `hsla(${b.hue}, 90%, 70%, ${alpha * 0.07})`);
      midGrad.addColorStop(1, `hsla(${b.hue}, 90%, 75%, ${alpha * 0.09})`);

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.beginPath();
      ctx.moveTo(bx - midW, startY);
      ctx.lineTo(bx + midW, startY);
      ctx.lineTo(bx + midW * 0.7, currentEndY);
      ctx.lineTo(bx - midW * 0.7, currentEndY);
      ctx.closePath();
      ctx.fillStyle = midGrad;
      ctx.fill();
      ctx.restore();

      // ── Impact glow ─────────────
      if (beamLength > 0.5) {
        const impactAlpha = alpha * 0.35;
        const impR = 20 + 10 * Math.sin(t * 4 + b.x * 20);

        const impGrad = ctx.createRadialGradient(bx, currentEndY, 0, bx, currentEndY, impR);
        impGrad.addColorStop(0, `hsla(${b.hue}, 100%, 90%, ${impactAlpha * 0.4})`);
        impGrad.addColorStop(0.3, `hsla(${b.hue}, 100%, 70%, ${impactAlpha * 0.2})`);
        impGrad.addColorStop(0.7, `hsla(${b.hue}, 80%, 50%, ${impactAlpha * 0.06})`);
        impGrad.addColorStop(1, `hsla(${b.hue}, 80%, 40%, 0)`);

        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = impGrad;
        ctx.fillRect(bx - impR, currentEndY - impR, impR * 2, impR * 2);
        ctx.restore();
      }
    }

    // Fog / atmospheric haze particles
    const fogParticles = Array.from({ length: 20 }, () => ({
      x: Math.random(),
      y: 0.4 + Math.random() * 0.55,
      r: 50 + Math.random() * 80,
      speed: 0.002 + Math.random() * 0.004,
      alpha: 0.008 + Math.random() * 0.015,
    }));

    function drawFog(t) {
      const W = canvas.width;
      const H = canvas.height;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      fogParticles.forEach((p) => {
        const px = ((p.x + t * p.speed) % 1.3 - 0.15) * W;
        const py = p.y * H + Math.sin(t * 0.7 + p.x * 10) * 15;
        const grad = ctx.createRadialGradient(px, py, 0, px, py, p.r);
        grad.addColorStop(0, `hsla(156, 45%, 80%, ${p.alpha})`);
        grad.addColorStop(1, `hsla(156, 45%, 80%, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(px - p.r, py - p.r, p.r * 2, p.r * 2);
      });
      ctx.restore();
    }

    function easeOutCubic(x) {
      return 1 - Math.pow(1 - x, 3);
    }

    function animate() {
      time += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fog behind beams
      drawFog(time);

      // Draw beams & respawn dead ones
      for (let i = 0; i < beams.length; i++) {
        const age = time - beams[i].birthTime;
        if (age / beams[i].life > 1) {
          // Respawn at new random position
          beams[i] = randomBeam(time + Math.random() * 0.5);
        }
        drawBeam(beams[i], time);
      }

      animId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section ref={ref} id="about" className="about-section">
      {/* Background layers */}
      <div className="about-bg" />
      <div className="about-overlay" />

      {/* Laser beams canvas */}
      <canvas ref={canvasRef} className="about-lasers-canvas" />

      {/* Atmospheric fog overlay (CSS) */}
      <div className="about-fog-layer" />

      {/* Content */}
      <div className="about-content" ref={contentRef}>
        {/* Badge */}
        <span className="about-badge about-animate">About Us</span>

        {/* Description */}
        <p className="about-description about-animate">
          Acunetix 12.0 is a flagship event organised by ACES and CSI,
          offering a range of Tech &amp; Non-Tech events. Participants take
          part in diverse competitions, showcasing their skills and earning
          recognition. With exciting prizes and a mix of solo and team events,
          it's a unique opportunity for students to shine and be part of an
          unforgettable experience.
        </p>
      </div>
    </section>
  );
});

About.displayName = 'About';
export default About;
