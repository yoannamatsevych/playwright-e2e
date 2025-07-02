import { test as base } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import { DynamicElementsPage } from "../pages/DynamicElementsPage";
import { FrontendTestingPage } from "../pages/FrontendTestingPage";

type MyFixtures = {
  basePage: BasePage,
  dynamicElementsPage: DynamicElementsPage
  frontendTestingPage: FrontendTestingPage
}

// Extend the Playwright test runner to create your custom fixture
export const test = base.extend<MyFixtures>({

  // Now, we will define the fixture, and provide the fixture function in it
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page)
    await use(basePage)
  },

  dynamicElementsPage: async ({ page }, use) => {
    const dynamicElementsPage = new DynamicElementsPage(page)
    await use(dynamicElementsPage)
  }, 

  frontendTestingPage: async ({ page }, use) => {
  const frontendTestingPage = new FrontendTestingPage(page)
  await use(frontendTestingPage)
  } 
});

export { expect, Locator, chromium, webkit } from '@playwright/test'