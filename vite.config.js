/* eslint-disable no-undef */
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.VITE_EMAILJS_SERVICE_ID": JSON.stringify(
        env.VITE_EMAILJS_SERVICE_ID
      ),
      "process.env.VITE_EMAILJS_TEMPLATE_ID": JSON.stringify(
        env.VITE_EMAILJS_TEMPLATE_ID
      ),
      "process.env.VITE_EMAILJS_PUBLIC_KEY": JSON.stringify(
        env.VITE_EMAILJS_PUBLIC_KEY
      ),
    },
    plugins: [react(), svgr()],
    server: {
      open: true,
      port: 3000,
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: false,
      },
      outDir: "./build",
    },
    assetsInclude: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.svg"],
  };
});
