import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.VITE_OPENAI_API_KEY": JSON.stringify(
        env.VITE_OPENAI_API_KEY
      ),
    },
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: "https://api.apollo.io", // The API you're calling
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""), // Remove '/api' prefix from the request path
        },
      },
    },
  };
});
