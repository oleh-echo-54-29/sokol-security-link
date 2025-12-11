import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "dist",
    sourcemap: true, // важливо для дебагу екстеншну
    rollupOptions: {
      input: {
        popupMaximized: "UI_components/popup_maximized/index.tsx",
        popupMinimized: "UI_components/popup_minimized/index.tsx",
        options: "UI_components/bom_options_popup/bom_options_popup.html",
        content: "service_content_scripts/content_script.tsx",
        background: "service_worker/service_worker.ts",
      },
      output: {
        entryFileNames: (chunk) => {
          // НАЗВИ БАНДЛІВ ЯК ТИ ХОЧЕШ
          if (chunk.name === "content") return "content.js";
          if (chunk.name === "background") return "service-worker.js";
          return "assets/[name].js";
        },
      },
    },
  },
  plugins: [react(), crx({ manifest: manifest })],
});
