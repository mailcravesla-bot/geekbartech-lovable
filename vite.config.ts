import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

// Copies the built assets from /dist to the project root after build,
// so index.html ends up at the root as the user requested.
function copyDistToRoot() {
  return {
    name: "copy-dist-to-root",
    apply: "build" as const,
    closeBundle() {
      const distDir = path.resolve(__dirname, "dist");
      const rootDir = path.resolve(__dirname);
      if (!fs.existsSync(distDir)) return;

      const copyRecursive = (src: string, dest: string) => {
        const stat = fs.statSync(src);
        if (stat.isDirectory()) {
          if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
          for (const entry of fs.readdirSync(src)) {
            copyRecursive(path.join(src, entry), path.join(dest, entry));
          }
        } else {
          fs.copyFileSync(src, dest);
        }
      };

      for (const entry of fs.readdirSync(distDir)) {
        copyRecursive(path.join(distDir, entry), path.join(rootDir, entry));
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "./",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    copyDistToRoot(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
