/**
 * Vite Humans.txt Plugin
 *
 * Updates humans.txt with the last git commit date during build.
 * No external dependencies - uses Node.js built-in child_process.
 */

import type { Plugin } from 'vite';
import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import path from 'path';

export interface HumansTxtOptions {
  /** Path to humans.txt file (relative to project root)
   * @default 'public/humans.txt'
   */
  source?: string;
}

function getLastCommitDate(projectRoot: string): string {
  try {
    // Get the last commit date in YYYY/MM format
    const date = execSync('git log -1 --format=%cs', {
      encoding: 'utf-8',
      cwd: projectRoot,
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
    // Convert from YYYY-MM-DD to YYYY/MM
    const [year, month] = date.split('-');
    return `${year}/${month}`;
  } catch {
    // Fallback to current date if git is not available
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}/${month}`;
  }
}

function updateHumansTxt(content: string, lastUpdate: string): string {
  // Replace the "Last update:" line with the new date
  return content.replace(
    /^(\s*Last update:)\s*.*$/m,
    `$1 ${lastUpdate}`,
  );
}

export function humansTxt(options: HumansTxtOptions = {}): Plugin {
  const {
    source = 'public/humans.txt',
  } = options;

  let projectRoot: string;

  return {
    name: 'vite-plugin-humans-txt',
    apply: 'build', // Only run during build, not dev server

    configResolved(config) {
      projectRoot = config.root;
    },

    buildStart() {
      const sourcePath = path.resolve(projectRoot, source);

      // Check if source file exists
      if (!existsSync(sourcePath)) {
        console.warn(`\n⚠️ humans.txt not found at ${source}, skipping update\n`);
        return;
      }

      // Add source file to watch list
      this.addWatchFile(sourcePath);

      // Read existing content
      const existingContent = readFileSync(sourcePath, 'utf-8');

      // Get last commit date
      const lastUpdate = getLastCommitDate(projectRoot);

      console.log(`\n👤 Updating humans.txt with last commit date: ${lastUpdate}`);

      // Update content
      const updatedContent = updateHumansTxt(existingContent, lastUpdate);

      // Emit the file
      this.emitFile({
        type: 'asset',
        fileName: 'humans.txt',
        source: updatedContent,
      });

      console.log('✅ humans.txt updated\n');
    },
  };
}

export default humansTxt;
