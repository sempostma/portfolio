/**
 * Custom Vite Plugins
 *
 * This file exports all custom plugins as an array that can be spread
 * into the Vite config plugins array.
 */

import type { Plugin } from 'vite';
import { faviconGenerator } from './favicon-generator';
import { humansTxt } from './humans-txt';
import { generateSitemapPlugin } from './sitemap/generate';
import { sitemap } from '../sitemap';

export const customPlugins: Plugin[] = [
  generateSitemapPlugin(sitemap),
  faviconGenerator({
    source: 'public/favicon.svg',
    themeColor: '#ff7f0e',
  }),
  humansTxt(),
];

// Re-export individual plugins for direct use if needed
export { faviconGenerator } from './favicon-generator';
export { humansTxt } from './humans-txt';
export { generateSitemapPlugin } from './sitemap/generate';
