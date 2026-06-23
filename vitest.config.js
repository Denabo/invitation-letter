import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    // Test file patterns
    include: ["src/**/*.spec.js", "src/**/*.test.js"],

    // Exclude patterns
    exclude: ["node_modules", "dist"],

    // Environment for server tests
    environment: "node",

    // Coverage configuration
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/**/*.{js,jsx}"],
      exclude: ["src/**/*.spec.js", "src/**/*.test.js"],
    },

    // Global test timeout
    testTimeout: 10000,

    // Reporter
    reporters: ["verbose"],
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
