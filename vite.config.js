import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import VZN from "vite-plugin-vzn";
import tailwindcss from "tailwindcss";

export default defineConfig({
  build: {
    target: "esnext",
  },
  plugins: [tsconfigPaths(), VZN(), tailwindcss()],
});
