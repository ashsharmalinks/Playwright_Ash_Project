import { Page } from 'playwright';
import { logger } from '../utils/logger'; // ✅ Adjust the path if needed

export class AbstractPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForElement(selector: string, timeout: number = 5000): Promise<void> {
    try {
      await this.page.waitForSelector(selector, { timeout });
      logger.info(`✅ Element found: ${selector}`);
    } catch (error) {
      logger.error(`❌ Element not found: ${selector} within ${timeout}ms`);
      throw error;
    }
  }

  async clickElement(selector: string): Promise<void> {
    try {
      await this.page.click(selector);
      logger.info(`✅ Clicked element: ${selector}`);
    } catch (error) {
      logger.error(`❌ Failed to click element: ${selector}`);
      throw error;
    }
  }

  async getElementText(selector: string): Promise<string> {
    return this.page.locator(selector).textContent().then(text => {
      logger.info(`✅ Retrieved text from element: ${selector}`);
      return text || '';
    }).catch(error => {
      logger.error(`❌ Failed to get text from element: ${selector}`);
      throw error;
    });
  }

  async wait(timeout: number): Promise<void> {
    await this.page.waitForTimeout(timeout);
  }

}