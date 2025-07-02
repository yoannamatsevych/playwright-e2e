import { test as teardown } from "@playwright/test";

teardown("do logout", async ({ page }) => {
  await page.goto("https://demoblaze.com/");

  const logoutButton = page.locator("#logout2");

  await logoutButton.click();

  console.log("LOGGED OUT!");
});