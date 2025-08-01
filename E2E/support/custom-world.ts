// support/custom-world.ts
import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Page, Browser, BrowserContext } from 'playwright';
import { Pickle } from '@cucumber/messages';

import { LoginPage } from '../pages/LoginPage';
import { AccountSummaryPage } from '../pages/AccountSummaryPage';
import { FeedbackPage } from '../pages/FeedbackPage';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  pickle!: Pickle;

  loginPage?: LoginPage;
  accountSummaryPage?: AccountSummaryPage;  // ✅ Add this line
  feedbackPage?: FeedbackPage;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
