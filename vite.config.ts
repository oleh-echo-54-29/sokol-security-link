import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'
import { crx } from "@crxjs/vite-plugin";
import { viteStaticCopy } from 'vite-plugin-static-copy';
import manifest from "./manifest.config.js";
import { resolve } from "path";

export default defineConfig((args: any) => {
  console.log(args);
  return {
    build: {
      outDir: "dist",
      sourcemap: true,
      minify: false,
      emptyOutDir: false,
      rollupOptions: {
        input: {},
        output: {
          entryFileNames: "[name].js",
          chunkFileNames: "chunks/[name]-[hash].js",
          sourcemap: true,
          sourcemapPathTransform: (relativeSourcePath, sourcemapPath) => {
            return relativeSourcePath;
          },
        },
      },
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
    esbuild: {
      target: "esnext",
      sourcemap: true,
      sourcesContent: true,
    },
    plugins: [
      react({
        include: "**/*.{tsx,jsx}",
      }),
      tailwindcss(),
      viteStaticCopy({
        targets: [
          {
            src: "sprites/icon/*",
            dest: "assets",
          },
          {
            src: "sprites/ui-icon/*",
            dest: "assets",
          },
        ],
      }),
      crx({ manifest }),
    ],
  }
});
