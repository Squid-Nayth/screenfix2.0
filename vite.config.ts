import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      build: {
        target: 'es2018',
        sourcemap: false,
        minify: 'esbuild',
        cssCodeSplit: true,
        esbuild: {
          drop: ['console', 'debugger']
        },
        rollupOptions: {
          input: {
            main: path.resolve(__dirname, 'index.html'),
            admin: path.resolve(__dirname, 'admin/index.html'),
          },
          output: {
            manualChunks: {
              react: ['react', 'react-dom'],
              gsap: ['gsap']
            }
          }
        }
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.NEXT_PUBLIC_TINA_CLIENT_ID': JSON.stringify(env.NEXT_PUBLIC_TINA_CLIENT_ID || ''),
        'process.env.TINA_CLIENT_ID': JSON.stringify(env.TINA_CLIENT_ID || env.NEXT_PUBLIC_TINA_CLIENT_ID || ''),
        'process.env.TINA_TOKEN': JSON.stringify(env.TINA_TOKEN || ''),
        'process.env.TINA_BRANCH': JSON.stringify(env.TINA_BRANCH || 'main'),
        'process.env.NEXT_PUBLIC_TINA_BRANCH': JSON.stringify(env.NEXT_PUBLIC_TINA_BRANCH || env.TINA_BRANCH || 'main'),
        'process.env.VERCEL_GIT_COMMIT_REF': JSON.stringify(env.VERCEL_GIT_COMMIT_REF || ''),
        'process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF': JSON.stringify(env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || ''),
        'process.env.HEAD': JSON.stringify(env.HEAD || '')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
