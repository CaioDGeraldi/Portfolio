const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests/e2e",
  timeout: 30000,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [[ "list" ], [ "html", { open: "never", outputFolder: "playwright-report" }]] : "list",
  use: {
    baseURL: "http://127.0.0.1:8765/Portfolio/",
    browserName: "chromium",
    reducedMotion: "reduce",
    screenshot: "only-on-failure",
    trace: "retain-on-failure"
  },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 8765",
    url: "http://127.0.0.1:8765/Portfolio/",
    reuseExistingServer: !process.env.CI,
    timeout: 30000
  }
});
