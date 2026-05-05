import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Pull large framework / UI deps into long-cacheable vendor chunks
        // so the per-page chunks stay tiny and changes to app code don't
        // bust the framework cache for returning visitors.
        manualChunks: {
          "react-vendor": [
            "react",
            "react-dom",
            "react/jsx-runtime",
            "react-router-dom",
            "react-helmet-async",
          ],
          "ui-vendor": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-dialog",
            "@radix-ui/react-label",
            "@radix-ui/react-slot",
            "@radix-ui/react-toast",
            "@radix-ui/react-tooltip",
            "sonner",
          ],
        },
      },
    },
  },
}));
