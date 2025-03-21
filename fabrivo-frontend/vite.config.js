import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(),
        tailwindcss(),
],

  test: {
    globals: true, // Enable global variables like `describe`, `test`, etc.
    environment: 'jsdom', // Use JSDOM for browser-like environment
    setupFiles: "./src/setupTests.js", // Correct path
  },


   
});
