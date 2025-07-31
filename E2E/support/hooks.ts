import {
  BeforeAll,
  AfterAll,
  Before,
  After,
  setDefaultTimeout,
  Status,
} from '@cucumber/cucumber';
import { chromium, Browser } from 'playwright';
import fs from 'fs';
import path from 'path';
import { logger } from '../utils/logger';

let browser: Browser;

setDefaultTimeout(60 * 1000); // 60 seconds timeout per step

BeforeAll(async function () {
  const headlessMode = process.env.PLAYWRIGHT_HEADLESS !== 'false';

  logger.info(`🚀 Launching browser in ${headlessMode ? 'headless' : 'headful'} mode`);
  browser = await chromium.launch({
    headless: headlessMode,
    slowMo: 100,
  });

  // Ensure output folders exist
  fs.mkdirSync('test-results/screenshots', { recursive: true });
  fs.mkdirSync('test-results/traces', { recursive: true });
});

AfterAll(async function () {
  if (browser) {
    logger.info('👋 Closing browser.');
    await browser.close();
  }
});

Before(async function (scenario) {
  const isUI = scenario.pickle.tags.some(tag => tag.name === '@ui');

  if (isUI) {
    this.context = await browser.newContext({ ignoreHTTPSErrors: true });
    this.page = await this.context.newPage();

    logger.info('✨ New browser context and page created.');

    await this.context.tracing.start({
      screenshots: true,
      snapshots: true,
    });
  }
});

After(async function (scenario) {
  const isUI = scenario.pickle.tags.some(tag => tag.name === '@ui');

  const name = scenario.pickle.name.replace(/[^a-z0-9]+/gi, '_').toLowerCase();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const screenshotPath = `test-results/screenshots/${name}-${timestamp}.png`;
  const tracePath = `test-results/traces/${name}-${timestamp}.zip`;

  try {
    if (isUI && scenario.result?.status === Status.FAILED && this.page) {
      logger.error(`❌ Scenario Failed: ${scenario.pickle.name}`);
      const screenshot = await this.page.screenshot({ path: screenshotPath, fullPage: true });
      await this.attach(screenshot, 'image/png');
      logger.error(`📸 Screenshot saved: ${screenshotPath}`);
      await this.context.tracing.stop({ path: tracePath });
      logger.error(`📦 Trace saved: ${tracePath}`);
    } else if (isUI) {
      await this.context.tracing.stop();
    }
  } catch (err: any) {
    logger.error(`🔥 After hook error: ${err.message}`);
  } finally {
    if (isUI) {
      await this.page?.close();
      await this.context?.close();
      logger.info('🧹 Browser context closed.');
    }
  }
});
