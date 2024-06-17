import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (e.g., 'development', 'production')
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      proxy: {
        // Use the environment variable for the proxy URL
        "/api": {
          target: env.VITE_PROXY_URL,
          changeOrigin: true,
        },
      },
    },
    define: {
      "process.env": {
        VITE_PROXY_URL: env.VITE_PROXY_URL,
      },
    },
  };
});
