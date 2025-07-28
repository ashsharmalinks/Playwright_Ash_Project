import { Page } from 'playwright';
import { logger } from '../utils/logger'; // ✅ Adjust the path if needed

export class AccountSummaryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getSavingsAccountCountUnderCashAccounts(): Promise<number> {
    const cashAccountSection = this.page.locator('h2', { hasText: 'Cash Accounts' });
    await cashAccountSection.waitFor();

    // Get the table rows under Cash Accounts
    const savingsRows = this.page.locator('h2:has-text("Cash Accounts") + div table tbody tr');

    // Count the number of savings account entries
    const count = await savingsRows.count();
    logger.info(`✅ Found ${count} savings account(s) under Cash Accounts.`);
    return count;
  }

  async verifyAllNavigationLinks(): Promise<void> {
    const navLinks = this.page.locator('a[href]:visible');
    const linkCount = await navLinks.count();
    logger.info(`🔍 Found ${linkCount} navigation links on the page.`);

    for (let i = 0; i < linkCount; i++) {
      const link = navLinks.nth(i);
      const href = await link.getAttribute('href');
      const text = (await link.textContent())?.trim() || '';

      if (!href || href.startsWith('javascript:') || href.startsWith('#')) {
        logger.warn(`⏭️ Skipping non-navigable link: ${text} (${href})`);
        continue;
      }

      const isExternal = href.startsWith('http') && !href.includes('zero.webappsecurity.com');
      logger.info(`➡️ Testing link ${i + 1}/${linkCount}: ${text} (${href})`);

      if (isExternal) {
        try {
          const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            link.click(), // opens new tab
          ]);

          await newPage.waitForLoadState('domcontentloaded');
          logger.info(`🌐 Opened external page: ${newPage.url()}`);

          const acceptButton = newPage.locator('text=/Accept|Agree|OK|Got it/i');
          if (await acceptButton.first().isVisible({ timeout: 2000 }).catch(() => false)) {
            await acceptButton.first().click();
            logger.info(`🍪 Accepted cookies on: ${newPage.url()}`);
          }

          await newPage.close();
          logger.info(`❎ Closed external tab: ${text}`);
        } catch (err: any) {
          logger.error(`🔥 Failed to handle external link: ${text} (${href}) — ${err.message}`);
        }
      } else {
        try {
          await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
            link.click()
          ]);
          logger.info(`✅ Navigated to internal page: ${this.page.url()}`);
          await this.page.goBack({ waitUntil: 'domcontentloaded' });
        } catch (err: any) {
          logger.error(`❌ Internal link failed: ${text} (${href}) — ${err.message}`);
        }
      }
    }

    logger.info('🎉 Completed link verification for all navigation links on the page.');
  }
}
