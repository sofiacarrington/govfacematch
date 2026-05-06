import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  publicDir: 'public',
  
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    
    // Code splitting configuration
    rollupOptions: {
      output: {
        // Split chunks by type
        manualChunks: {
          'animations': ['./src/components/reveal.js', './src/components/counter.js'],
          'modal': ['./src/components/video-modal.js'],
          'interactions': ['./src/components/tabs.js', './src/components/accordion.js']
        },
        // Naming pattern for chunks
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    },
    
    // Inline critical CSS (styles < 4kb)
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  
  // Asset handling for multiple image formats
  assetsInclude: ['**/*.webp', '**/*.avif', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg'],
  
  // Dev server config
  server: {
    port: 3000,
    open: true
  },
  
  // Preview server config
  preview: {
    port: 3000
  }
});
