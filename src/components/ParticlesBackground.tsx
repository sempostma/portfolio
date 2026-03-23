import { loadBasic } from '@tsparticles/basic';
import Particles, { initParticlesEngine } from '@tsparticles/react';

initParticlesEngine(async engine => {
  await loadBasic(engine);
});

export function ParticlesBackground() {
  return (
    <Particles
      options={{
        particles: {
          number: {
            value: 160,
            density: {
              enable: true,
              width: 1000,
              height: 1000,
            },
          },
          color: {
            value: '#ffffff',
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: { min: 0, max: 1 },
            animation: {
              mode: 'random',
              speed: 1,
              enable: true,
              startValue: 'random',
              sync: false,
            },
          },
          size: {
            value: { min: 0.3, max: 3 },
            animation: {
              mode: 'random',
              enable: false,
              speed: 4,
              startValue: 'random',
              sync: false,
            },
          },
          line_linked: {
            enable: false,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: true,
            straight: false,
            outModes: 'out',
            attract: {
              enable: false,
              rotate: {
                x: 600,
                y: 600,
              },
            },
          },
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onHover: {
              enable: true,
              mode: 'bubble',
            },
            onClick: {
              enable: true,
              mode: 'repulse',
            },
            resize: {
              enable: true,
            },
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 250,
              size: 0,
              duration: 2,
              opacity: 0,
              speed: 3,
            },
            repulse: {
              distance: 400,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      }}
    />
  );
}
