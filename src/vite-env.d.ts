/// <reference types="vite/client" />

declare module '*.mdx' {
  import type { ComponentType } from 'react';
  const component: ComponentType;
  export default component;
}

declare global {
  interface Window {
    particlesJS: {
      load: (id: string, configPath: string, callback: () => void) => void;
    };
  }
}

export { };

