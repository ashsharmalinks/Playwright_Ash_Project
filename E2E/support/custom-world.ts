// support/custom-world.ts
import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Page, BrowserContext } from 'playwright';
import { LoginPage, } from '../pages/LoginPage';
import { AccountSummaryPage } from "../pages/AccountSummaryPage";


export class CustomWorld extends World {
  page!: Page;
  context!: BrowserContext;
  loginPage?: LoginPage;
  accountSummaryPage?: AccountSummaryPage;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
