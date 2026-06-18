import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

// Automatically normalize user-provided assets with complex names (emojis, hashes, spaces) to simple standard URLs
const publicDir = path.resolve(__dirname, 'public');
if (fs.existsSync(publicDir)) {
  try {
    const files = fs.readdirSync(publicDir);
    const mapping = {
      "POV-": "ugc_video_1.mp4",
      "Discover the ritual": "ugc_video_2.mp4",
      "tried my fair share": "ugc_video_3.mp4",
      "towel robe": "ugc_video_4.mp4",
      "following my": "ugc_video_5.mp4"
    };
    files.forEach(f => {
      if (f.endsWith('.mp4')) {
        for (const [key, target] of Object.entries(mapping)) {
          if (f.includes(key)) {
            const srcPath = path.join(publicDir, f);
            const dstPath = path.join(publicDir, target);
            if (fs.existsSync(srcPath)) {
              fs.copyFileSync(srcPath, dstPath);
              console.log(`[Asset Optimization] Copied ${f} -> ${target}`);
            }
          }
        }
      }
    });
  } catch (err) {
    console.error("[Asset Optimization Error] Failed to copy/normalize videos:", err);
  }
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'assets/theme.js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'assets/theme.css';
            }
            return 'assets/[name].[ext]';
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
