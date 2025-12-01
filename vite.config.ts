import { defineConfig } from './node_modules/vite/dist/node/index'
import react from './node_modules/@vitejs/plugin-react/dist/index.js'
import tailwindcss from './node_modules/@tailwindcss/vite/dist/index.mjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
