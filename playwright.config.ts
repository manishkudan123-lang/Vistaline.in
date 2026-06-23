import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 60000,
  use: {
    baseURL: 'http://localhost:3000',
    locale: 'en-IN',
  },
  webServer: {
    command: 'npx serve dist -l 3000 -s --no-clipboard',
    port: 3000,
    timeout: 30000,
    reuseExistingServer: true,
  },
});
