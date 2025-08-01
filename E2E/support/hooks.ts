// E2E/support/hooks.ts
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
import { CustomWorld } from './custom-world';

setDefaultTimeout(60 * 1000); // 60s per step timeout

BeforeAll(() => {
  // Ensure output folders exist before test run
  fs.mkdirSync('test-results/screenshots', { recursive: true });
  fs.mkdirSync('test-results/traces', { recursive: true });
});

AfterAll(() => {
  logger.info('✅ Test execution complete.');
});

Before(async function (this: CustomWorld, scenario) {
  const isUI = scenario.pickle.tags.some(tag => tag.name === '@ui');

  if (isUI) {
    logger.info(`[Worker-${process.pid}] 🚀 Launching browser for: "${scenario.pickle.name}"`);

    this.browser = await chromium.launch({
      headless: process.env.PLAYWRIGHT_HEADLESS !== 'false',
      slowMo: 100,
    });

    this.context = await this.browser.newContext({ ignoreHTTPSErrors: true });
    this.page = await this.context.newPage();

    await this.context.tracing.start({
      screenshots: true,
      snapshots: true,
    });

    logger.info(`[Worker-${process.pid}] ✨ Browser context ready`);
  }
});

After(async function (this: CustomWorld, scenario) {
  const isUI = this.browser && this.context && this.page;
  const name = scenario.pickle.name.replace(/[^a-z0-9]+/gi, '_').toLowerCase();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

  const screenshotPath = `test-results/screenshots/${name}-${timestamp}.png`;
  const tracePath = `test-results/traces/${name}-${timestamp}.zip`;

  try {
    if (isUI && scenario.result?.status === Status.FAILED) {
      logger.error(`❌ Scenario Failed: "${scenario.pickle.name}"`);
      const screenshot = await this.page.screenshot({ path: screenshotPath, fullPage: true });
      await this.attach(screenshot, 'image/png');
      logger.error(`📸 Screenshot saved: ${screenshotPath}`);
    }

    if (isUI) {
      await this.context.tracing.stop({ path: tracePath });
      logger.info(`📦 Trace saved: ${tracePath}`);
    }
  } catch (err: any) {
    logger.error(`🔥 After hook error in scenario "${scenario.pickle.name}": ${err.message}`);
  } finally {
    if (isUI) {
      await this.page?.close();
      await this.context?.close();
      await this.browser?.close();
      logger.info(`🧹 Cleaned up browser context for: "${scenario.pickle.name}"`);
    }
  }
});
