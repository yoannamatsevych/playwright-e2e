import { test, expect } from '@playwright/test';

test.use({
  storageState: './test-data/authorization.json',
  launchOptions: {
    slowMo: 1500
  }
})

test('menu', async ({ page }) => {
  await page.goto('https://demoblaze.com/');

  await expect(page.locator('#nameofuser')).toBeVisible();
});

test('menu validation', async ({ page }) => {
  await page.goto('https://demoblaze.com/');

  await expect(page.locator('#logout2')).toBeVisible();
});