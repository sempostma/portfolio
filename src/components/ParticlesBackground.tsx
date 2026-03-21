import { useEffect } from 'react';

export function ParticlesBackground() {
  useEffect(() => {
    // Initialize particles.js when component mounts
    if (window.particlesJS && document.getElementById('particles-js')) {
      window.particlesJS.load('particles-js', './particlesjs-config.json', () => {
        console.log('particles loaded');
      });
    }
  }, []);

  return <div id="particles-js" className="fixed inset-0 z-0"></div>;
}
