import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // Fixes amplify usage of nodejs native modules
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser",
    },
  },
  plugins: [
    react({
      jsxImportSource: "theme-ui",
    }),
  ],
  define: {
    global: {},
  },
});
