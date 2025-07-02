import { test, expect } from "@playwright/test";

test.describe("First Test Suite", () => {
  test("Refresh, Navigate back and forward", async ({ page }) => {
    // Navigate to a page
    await page.goto("https://www.techglobal-training.com/");

    // Refresth the page
    await page.reload();

    // Navigate to another page
    await page.goto("https://www.techglobal-training.com/frontend");

    // Navigate back
    await page.goBack();

    // Navigate forward
    await page.goForward();
  });

  test("Validate page title", async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/");

    const title = await page.title();
    console.log(title, " My page title");

    // expect(title).toBe("TechGlobal Training | Home");

    await expect(page).toHaveTitle("TechGlobal Training | Home");
  });

  test("Validate page url", async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/");
  });
});