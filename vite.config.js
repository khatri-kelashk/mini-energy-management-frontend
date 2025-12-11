import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: "public", // Make sure this includes mockServiceWorker.js,
  build: {
    rollupOptions: {
      external: [], // Don't externalize MSW
    },
  },
});
