import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/BasePage';
import { FrontendTestingPage } from '../../pages/FrontendTestingPage';
import { DynamicElementsPage } from '../../pages/DynamicElementsPage';

test.describe('POM Tests', () => {
    let dynamicElementsPage: DynamicElementsPage;

    test.beforeEach(async({ page }) => {
        await page.goto('https://www.techglobal-training.com/'); 
        const basePage = new BasePage(page);
        await basePage.selectFrontendTesting();

        const frontendTestingPage = new FrontendTestingPage(page);
        await frontendTestingPage.clickOnCard('Dynamic Elements');

        dynamicElementsPage = new DynamicElementsPage(page);
    });

    test('Validate Dynamic Elements Page - box1', async({ page }) => {
        await expect(dynamicElementsPage.boxes).toHaveCount(2);
        expect(await dynamicElementsPage.box1.innerText()).toBe('Box 1');
    });

    test('Validate Dynamic Elements Page - box2', async({ page }) => {
        await expect(dynamicElementsPage.boxes).toHaveCount(2);
        expect(await dynamicElementsPage.box2.innerText()).toBe('Box 2');
    });
})