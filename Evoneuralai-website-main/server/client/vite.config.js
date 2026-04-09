import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'glsl-loader',
        transform(code, id) {
          if (id.endsWith('.glsl')) {
            return `export default ${JSON.stringify(code)}`;
          }
        },
      },
    ],

    // Inject environment variables at build time
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify('/api'),
      'import.meta.env.VITE_FIREBASE_API_KEY': JSON.stringify('AIzaSyBo9VsJMft4Qqap5oUmQowwbjiMQErloqU'),
      'import.meta.env.VITE_FIREBASE_AUTH_DOMAIN': JSON.stringify('in3devoneuralai.firebaseapp.com'),
      'import.meta.env.VITE_FIREBASE_PROJECT_ID': JSON.stringify('in3devoneuralai'),
      'import.meta.env.VITE_FIREBASE_STORAGE_BUCKET': JSON.stringify('in3devoneuralai.firebasestorage.app'),
      'import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify('708037023303'),
      'import.meta.env.VITE_FIREBASE_APP_ID': JSON.stringify('1:708037023303:web:f0d5b319b05aa119288362'),
      'import.meta.env.VITE_FIREBASE_MEASUREMENT_ID': JSON.stringify('G-FNENMQ3BMF'),
    },
    
    // Base public path when served in production
    base: '/',
    
    // Development server configuration
    server: {
      port: 3000,
      host: true,
      cors: true,
      clearScreen: false, // Keep previous output so errors are visible
      hmr: {
        overlay: true, // Show error overlay in browser
      },
    },

    // Make Vite's own logs visible (errors, warnings)
    logLevel: 'info',

    // Build configuration
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: mode !== 'production', // Disable in prod to avoid exposing source
      // Add timestamp to force cache busting
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            three: ['three', '@react-three/fiber', '@react-three/drei'],
          },
          // Simplify chunk names to avoid non-determinism during parallel rendering
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]',
        },
      },
      // Optimize chunk size warnings
      chunkSizeWarningLimit: 1000,
      // Use esbuild for faster and more stable minification compared to terser
      minify: 'esbuild',
    },

    // Resolve configuration
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    // CSS configuration
    css: {
      modules: {
        localsConvention: 'camelCase',
      },
      postcss: './postcss.config.js',
    },

    // Preview configuration
    preview: {
      port: 5173,
      host: 'localhost',
      strictPort: true,
    },

    // Optimize deps
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'three'],
      exclude: ['@blockadelabs/sdk'],
    },
  };
});
