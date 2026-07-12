import path from "path";
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tailwindcss from '@tailwindcss/vite'
import solidSvg from "vite-plugin-solid-svg";

export default defineConfig({
  plugins: [solid(), tailwindcss(), solidSvg()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
