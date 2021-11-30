import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import VZN from "vite-plugin-vzn";

export default defineConfig({
  build: {
    target: "esnext",
  },
  plugins: [tsconfigPaths(), VZN()],
});
