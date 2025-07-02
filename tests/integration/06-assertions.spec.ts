/*
Matchers - Assertions

soft assertion vs hard assertion

hard assertion: these are verification immediately failing tests if it does not matchs expected result .
It will immediately fail when one assertion fail

soft assertion: these are verification let's execution continue even though it fails but eventually fail the test

Auto retry vs non-retry assertions

auto retry: it waits for assertion to pass 5 seconds(default)
non-retry: it does not wait for assertion and immediately fails

await expect(page.url()).toContain('/login') - non-retry
await expect(page.locator('  ')).toBeVisible() - auto-retry

toBeVisible(), toHaveText(), toBeChecked(), toBeUnchecked(, toBeEnable() - have auto-retry

toBe(), toContain() - non-retry

*/

import {test, expect} from "@playwright/test";

test.describe('', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.facebook.com/');
    });

    test('Assertions - auto-retry', async ({ page }) => {
        test.fail();
        await expect(page.getByAltText('acebook', { exact: true })).toBeVisible();
    });

    test('Assertions - non-retry', async ({ page }) => {
        test.fail();
        expect(await page.title()).toBe('acebook - log in or sign up');
    });

    test('Assertions - toPass() command', async ({ page }) => {
        // toPass() can be used to change the behavior of non-retry assertion
        test.fail();

        await expect(async() => {
            expect(await page.title()).toBe('acebook - log in or sign up');
        }).toPass({ timeout: 4000 });
    });

    test.only('Soft Assertions', async({ page }) => {
        test.fail();
        console.log('1');
        expect.soft(await page.locator('._8eso').innerText()).toContain('abcde');
        console.log('2');
        await expect.soft(page.locator('._8eso')).toContainText('abcde');
        console.log('3');
    });
})