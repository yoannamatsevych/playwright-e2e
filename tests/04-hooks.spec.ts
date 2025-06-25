import { test, expect } from '@playwright/test';

test.describe('Playwright Hooks & Annotations', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.wikipedia.org/');
        console.log('This is before each running...');
    });

    test.afterEach(async ({ page }) => {
        console.log('This is after each running...');
    });

    // beforeAll and afterAll hooks cannot be used with page and context fixtures
    test.beforeAll(async ({ browser }) => {
        const page = await (await browser.newContext()).newPage();
        await page.goto('https://www.techglobal-training.com/');
        console.log('This is before all running...');
    });

    test.afterAll(async () => {
        console.log('This is after all running...');
    });

    test.fail('Test 1', async ({ page }) => {
        await page.waitForTimeout(1000);
        //test.fail();
        console.log(await page.title(), '1');
        expect(2).toBe(3);
    });

    // The reason we are skipping
    test.skip('Test 2', async ({ page }) => {
        await page.waitForTimeout(1000);
        console.log(await page.title(), '2');
    });

    test('Test 3', async ({ page }) => {
        test.slow(); // triple the global timeout time
        await page.waitForTimeout(1000);
        console.log(await page.title(), '3');
    });

    // There is a known issue and a bug raised for this - it is being skipped when executed
    test.fixme('Test 4', async ({ page }) => {
        await page.waitForTimeout(1000);
        console.log(await page.title(), '4');
    });
});


test.describe('Playwright step annotation', () => {

    test('Test report without step annotation', async ({ page }) => {
        await page.goto('https://www.techglobal-training.com/');
        await expect(page.locator('.active')).toBeVisible();
    });

    test('Test report with step annotation', async ({ page }) => {
        await test.step('Given user is on home page', async () => {
            await page.goto('https://www.techglobal-training.com/');
        });

        await test.step('Then logo is visible', async () => {
            await expect(page.locator('.active')).toBeVisible();
        });
    });
});


test.describe('Test info', () => {
    test.beforeEach(async({ page }, testInfo) => {
        console.log(testInfo.title, 'is starting....');
    });

    test.afterEach(async({ page }, testInfo) => {
        console.log(testInfo.title, 'execution is completed....');
        console.log('Duration:', testInfo.duration);
        console.log('Project:', testInfo.project.name);
    });

    test('Validate Logo', async ({ page }, testInfo) => {
        await page.goto('https://www.techglobal-training.com/');
        await expect(page.locator('.active')).toBeVisible();
    });
})