import { test, expect, Locator, chromium, webkit } from '../../fixtures/pom-fixtures';

test.describe('POM Tests', () => {

    test.beforeEach(async({ page, basePage, frontendTestingPage }) => {
        await page.goto('https://www.techglobal-training.com/'); 
        await basePage.selectFrontendTesting();

        await frontendTestingPage.clickOnCard('Dynamic Elements');
    });

    test('Validate Dynamic Elements Page - box1', async({ dynamicElementsPage }) => {
        await expect(dynamicElementsPage.boxes).toHaveCount(2);
        expect(await dynamicElementsPage.box1.innerText()).toBe('Box 1');
    });

    test('Validate Dynamic Elements Page - box2', async({ dynamicElementsPage }) => {
        await expect(dynamicElementsPage.boxes).toHaveCount(2);
        expect(await dynamicElementsPage.box2.innerText()).toBe('Box 2');
    });
})