import { defineConfig, devices } from "@playwright/test";

const localHost = "127.0.0.1";
const localPort = 3000;
const localBaseURL = `http://${localHost}:${localPort}`;
const baseURL = process.env.BASE_URL || localBaseURL;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: `pnpm dev --hostname ${localHost} --port ${localPort}`,
        url: localBaseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
