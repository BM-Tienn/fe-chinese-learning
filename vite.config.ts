import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import macrosPlugin from 'vite-plugin-babel-macros';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { fileURLToPath, URL } from 'node:url';
import EnvironmentPlugin from 'vite-plugin-environment';

export default defineConfig({
  base: '/',
  plugins: [
    react({}),
    viteTsconfigPaths(),
    EnvironmentPlugin('all', { prefix: 'REACT_APP_' }),
    macrosPlugin(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
      overlay: true,
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  optimizeDeps: {
    include: ['react', 'antd'],
  },
  define: {
    global: 'window',
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    'process.env': {},
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const _id = id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
            return _id;
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
      // services: fileURLToPath(new URL('./src/services', import.meta.url)),
      // utils: fileURLToPath(new URL('./src/utils', import.meta.url)),
      // components: fileURLToPath(new URL('./src/components', import.meta.url)),
      // containers: fileURLToPath(new URL('./src/containers', import.meta.url)),
      // types: fileURLToPath(new URL('./src/types', import.meta.url)),
      // config: fileURLToPath(new URL('./src/config', import.meta.url)),
      // contexts: fileURLToPath(new URL('./src/contexts', import.meta.url)),
      // store: fileURLToPath(new URL('./src/store', import.meta.url)),
    },
  },
  esbuild: {
    sourcemap: false,
  },
  server: {
    open: false,
    port: 5173,
  },
  preview: {
    port: 5173,
  },
});
