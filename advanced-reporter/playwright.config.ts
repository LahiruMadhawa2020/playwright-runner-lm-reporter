import { defineConfig } from '@playwright/test';

const isListMode = process.argv.includes('--list');

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  reporter: isListMode
    ? [['list']]
    : [
        ['list'],
        [
          'playwright-runner-lm-reporter/advanced',
          {
            outputDir: 'playwright-lm-report',
            reportTitle: 'Advanced Reporter — Login/Logout Demo',
            reportSubtitle: 'playwright-runner-lm-reporter advanced demo',
            defaultEnvironment: 'local',
            defaultAuthor: 'Lahiru Madhawa',
            liveRefreshSeconds: 0,
            theme: 'light',
          },
        ],
      ],
  use: {
    trace: 'on',
    screenshot: 'on',
    video: 'on',
  },
});
