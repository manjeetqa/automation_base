// @ts-check
import { defineConfig, Page } from '@playwright/test';

const config = defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  expect: {
    timeout: 60 * 1000,
  },

  reporter: 'html',

  use: {
    trace: 'on-failure',
    screenshot: 'on',

    // Allow real browser window to be fully maximized
    viewport: null,

    launchOptions: {
      args: [
        '--start-maximized',              // Maximize browser
        '--force-device-scale-factor=1'   // Prevent auto-zooming by OS DPI
      ]
    },

    // Automatically apply 70% zoom to every page
    onPageCreated: async (page) => {
      await page.evaluate(() => {
        document.body.style.zoom = "0.7";  // Default zoom: 70%
      });
    }
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...require('@playwright/test').devices['Desktop Chrome'],
        headless: false,
      },
    },
    {
      name: 'firefox',
      use: { 
        ...require('@playwright/test').devices['Desktop Firefox'],
        headless: false,
      },
    },
    {
      name: 'webkit',
      use: { 
        ...require('@playwright/test').devices['Desktop Safari'],
        headless: false,
      },
    },
  ],
});

export default config;
