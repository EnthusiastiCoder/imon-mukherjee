import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // "/" for a normal build. The /variants deployment sets VITE_BASE_PATH so the
  // same source builds a sub-app whose assets resolve under that prefix.
  base: process.env.VITE_BASE_PATH || "/",
  // The sub-app is served from the same domain as the root site and shares its
  // public/ assets — images, favicon, robots.txt — so copying them again would
  // duplicate 13 MB into the sub-app's output for nothing.
  publicDir: process.env.VITE_BASE_PATH ? false : "public",
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
