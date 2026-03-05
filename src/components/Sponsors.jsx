import React, { forwardRef } from 'react';
import LightRays from './LightRays';

const Sponsors = forwardRef((props, ref) => {
  return (
    <section
      ref={ref}
      id="sponsors"
      style={{
        position: 'relative',
        minHeight: '600px',
        background: '#000',
        overflow: 'hidden',
      }}
    >
      {/* LightRays background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      {/* Sponsors content goes here */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Content will be added later */}
      </div>
    </section>
  );
});

Sponsors.displayName = 'Sponsors';
export default Sponsors;
