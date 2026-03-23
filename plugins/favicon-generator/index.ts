/**
 * Vite Favicon Generator Plugin
 *
 * Generates all favicon variants from a source SVG file during build.
 * Uses sharp for image processing (the only external dependency).
 * Also injects the appropriate link/meta tags into index.html.
 */

import { readFileSync } from 'fs';
import path from 'path';
import sharp from 'sharp';
import type { HtmlTagDescriptor, Plugin } from 'vite';

// Icon configurations
const FAVICON_SIZES = [16, 32, 96];
const ANDROID_SIZES = [36, 48, 72, 96, 144, 192];
const APPLE_SIZES = [57, 60, 72, 76, 114, 120, 144, 152, 180];
const MS_SIZES = [70, 144, 150, 310];

export interface FaviconGeneratorOptions {
  /** Path to source SVG file (relative to project root)
   * @default 'public/favicon.svg'
   */
  source?: string;
  /** Background color for icons that need it
   * @default 'transparent'
   */
  background?: string;
  /** Theme color for manifest
   * @default '#ffffff'
   */
  themeColor?: string;
  /** MS tile color
   * @default '#ffffff'
   */
  msTileColor?: string;
  /** Generate manifest.json
   * @default true
   */
  generateManifest?: boolean;
  /** Generate browserconfig.xml
   * @default true
   */
  generateBrowserConfig?: boolean;
  /** Inject link/meta tags into HTML
   * @default true
   */
  injectHtmlTags?: boolean;
}

async function generatePng(
  svgBuffer: Buffer,
  size: number,
): Promise<Buffer> {
  return sharp(svgBuffer)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
}

async function generateIco(
  svgBuffer: Buffer,
  sizes: number[],
): Promise<Buffer> {
  const images: { size: number; data: Buffer }[] = [];

  for (const size of sizes) {
    const pngData = await sharp(svgBuffer)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();
    images.push({ size, data: pngData });
  }

  // Build ICO file
  const numImages = images.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = dirEntrySize * numImages;

  // Calculate offsets
  let offset = headerSize + dirSize;
  const offsets: number[] = [];
  for (const img of images) {
    offsets.push(offset);
    offset += img.data.length;
  }

  // Create buffer
  const totalSize = offset;
  const buffer = Buffer.alloc(totalSize);

  // ICO Header
  buffer.writeUInt16LE(0, 0); // Reserved
  buffer.writeUInt16LE(1, 2); // Type: 1 = ICO
  buffer.writeUInt16LE(numImages, 4); // Number of images

  // Directory entries
  for (let i = 0; i < numImages; i++) {
    const entryOffset = headerSize + i * dirEntrySize;
    const img = images[i];
    const size = img.size >= 256 ? 0 : img.size;

    buffer.writeUInt8(size, entryOffset); // Width
    buffer.writeUInt8(size, entryOffset + 1); // Height
    buffer.writeUInt8(0, entryOffset + 2); // Color palette
    buffer.writeUInt8(0, entryOffset + 3); // Reserved
    buffer.writeUInt16LE(1, entryOffset + 4); // Color planes
    buffer.writeUInt16LE(32, entryOffset + 6); // Bits per pixel
    buffer.writeUInt32LE(img.data.length, entryOffset + 8); // Image size
    buffer.writeUInt32LE(offsets[i], entryOffset + 12); // Image offset
  }

  // Image data
  for (let i = 0; i < numImages; i++) {
    images[i].data.copy(buffer, offsets[i]);
  }

  return buffer;
}

function generateBrowserConfigXml(): string {
  return `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square70x70logo src="/ms-icon-70x70.png"/>
            <square150x150logo src="/ms-icon-150x150.png"/>
            <square310x310logo src="/ms-icon-310x310.png"/>
            <TileColor>#ffffff</TileColor>
        </tile>
    </msapplication>
</browserconfig>`;
}

function generateManifestJson(appName: string, themeColor: string): string {
  const manifest = {
    name: appName,
    short_name: appName,
    icons: ANDROID_SIZES.map(size => ({
      src: `/android-icon-${size}x${size}.png`,
      sizes: `${size}x${size}`,
      type: 'image/png',
      density: String((size / 48).toFixed(1)),
    })),
    theme_color: themeColor,
    background_color: '#ffffff',
    display: 'standalone',
  };
  return JSON.stringify(manifest, null, 2);
}

function generateHtmlTags(
  themeColor: string,
  msTileColor: string,
  includeManifest: boolean,
): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = [];

  // SVG favicon (modern browsers)
  tags.push({
    tag: 'link',
    attrs: { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    injectTo: 'head',
  });

  // Apple touch icon (default)
  tags.push({
    tag: 'link',
    attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    injectTo: 'head',
  });

  // Apple touch icons with sizes
  for (const size of APPLE_SIZES) {
    tags.push({
      tag: 'link',
      attrs: {
        rel: 'apple-touch-icon',
        sizes: `${size}x${size}`,
        href: `/apple-icon-${size}x${size}.png`,
      },
      injectTo: 'head',
    });
  }

  // Android icon (192x192 is the most important)
  tags.push({
    tag: 'link',
    attrs: {
      rel: 'icon',
      type: 'image/png',
      sizes: '192x192',
      href: '/android-icon-192x192.png',
    },
    injectTo: 'head',
  });

  // Standard favicon PNGs
  for (const size of FAVICON_SIZES) {
    tags.push({
      tag: 'link',
      attrs: {
        rel: 'icon',
        type: 'image/png',
        sizes: `${size}x${size}`,
        href: `/favicon-${size}x${size}.png`,
      },
      injectTo: 'head',
    });
  }

  // Manifest
  if (includeManifest) {
    tags.push({
      tag: 'link',
      attrs: { rel: 'manifest', href: '/manifest.json' },
      injectTo: 'head',
    });
  }

  // MS application meta tags
  tags.push({
    tag: 'meta',
    attrs: { name: 'msapplication-TileColor', content: msTileColor },
    injectTo: 'head',
  });
  tags.push({
    tag: 'meta',
    attrs: { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
    injectTo: 'head',
  });

  // Theme color
  tags.push({
    tag: 'meta',
    attrs: { name: 'theme-color', content: themeColor },
    injectTo: 'head',
  });

  return tags;
}

export function faviconGenerator(options: FaviconGeneratorOptions = {}): Plugin {
  const {
    source = 'public/favicon.svg',
    themeColor = '#ffffff',
    msTileColor = '#ffffff',
    generateManifest = true,
    generateBrowserConfig = true,
    injectHtmlTags = true,
  } = options;

  let projectRoot: string;
  let appName = 'App';

  return {
    name: 'vite-plugin-favicon-generator',
    apply: 'build', // Only run during build, not dev server

    configResolved(config) {
      projectRoot = config.root;

      // Try to read app name from package.json
      try {
        const pkgPath = path.join(projectRoot, 'package.json');
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
        appName = pkg.name || appName;
      } catch {
        // Ignore errors
      }
    },

    transformIndexHtml() {
      if (!injectHtmlTags) {
        return [];
      }
      return generateHtmlTags(themeColor, msTileColor, generateManifest);
    },

    async buildStart() {
      const sourcePath = path.resolve(projectRoot, source);

      // Add source file to watch list
      this.addWatchFile(sourcePath);

      const svgBuffer = readFileSync(sourcePath);

      console.log(`\n🎨 Generating favicons from ${source}...`);

      // Generate standard favicons
      for (const size of FAVICON_SIZES) {
        const pngData = await generatePng(svgBuffer, size);
        this.emitFile({
          type: 'asset',
          fileName: `favicon-${size}x${size}.png`,
          source: pngData,
        });
      }

      // Generate Android icons
      for (const size of ANDROID_SIZES) {
        const pngData = await generatePng(svgBuffer, size);
        this.emitFile({
          type: 'asset',
          fileName: `android-icon-${size}x${size}.png`,
          source: pngData,
        });
      }

      // Generate Apple icons
      for (const size of APPLE_SIZES) {
        const pngData = await generatePng(svgBuffer, size);
        this.emitFile({
          type: 'asset',
          fileName: `apple-icon-${size}x${size}.png`,
          source: pngData,
        });
      }

      // Generate additional Apple icons
      const appleTouchIcon = await generatePng(svgBuffer, 180);
      this.emitFile({
        type: 'asset',
        fileName: 'apple-icon.png',
        source: appleTouchIcon,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'apple-icon-precomposed.png',
        source: appleTouchIcon,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'apple-touch-icon.png',
        source: appleTouchIcon,
      });

      // Generate MS icons
      for (const size of MS_SIZES) {
        const pngData = await generatePng(svgBuffer, size);
        this.emitFile({
          type: 'asset',
          fileName: `ms-icon-${size}x${size}.png`,
          source: pngData,
        });
      }

      // Generate favicon.ico (multi-resolution)
      const icoData = await generateIco(svgBuffer, [16, 32, 48]);
      this.emitFile({
        type: 'asset',
        fileName: 'favicon.ico',
        source: icoData,
      });

      // Generate browserconfig.xml
      if (generateBrowserConfig) {
        this.emitFile({
          type: 'asset',
          fileName: 'browserconfig.xml',
          source: generateBrowserConfigXml(),
        });
      }

      // Generate manifest.json
      if (generateManifest) {
        this.emitFile({
          type: 'asset',
          fileName: 'manifest.json',
          source: generateManifestJson(appName, themeColor),
        });
      }

      console.log(
        `✅ Generated ${
          FAVICON_SIZES.length + ANDROID_SIZES.length + APPLE_SIZES.length + MS_SIZES.length + 5
        } favicon files\n`,
      );
    },
  };
}

export default faviconGenerator;
