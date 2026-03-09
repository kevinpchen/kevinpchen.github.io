import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// User site (kevinpchen.github.io) so base is "/"
export default defineConfig({
  plugins: [react()],
  base: "/",
});

