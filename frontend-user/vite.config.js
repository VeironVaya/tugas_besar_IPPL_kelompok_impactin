import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(() => {
  const isDocker = process.env.DOCKER === "true";

  return {
    plugins: [react()],
    server: {
      host: "0.0.0.0",
      port: 5174,
      proxy: {
        "/api": {
          target: isDocker
            ? "http://backend:8080"
            : "http://localhost:8080",
          changeOrigin: true,
        },
      },
    },
  };
});
