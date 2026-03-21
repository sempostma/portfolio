/// <reference types="vite/client" />

declare module '*.mdx' {
  import type { ComponentType } from 'react';
  const component: ComponentType;
  export default component;
}

declare global {
  interface Window {
    Pageable: any;
    particlesJS: {
      load: (id: string, configPath: string, callback: () => void) => void;
    };
    initD3TechStackBubble: (onReady: (runAnimation: () => void) => void) => void;
  }
}

export {};
