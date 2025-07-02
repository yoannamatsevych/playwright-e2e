import { test, expect } from '@playwright/test';


test.describe('Element States', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.techglobal-training.com/");
        await page.hover('#dropdown-testing');
        await page.click('#frontend-option')

        await page.getByRole('link', { name: 'HTML Elements' }).click();
    });

    test('Element States', async({ page }) => {
        console.log(await page.getByText('You clicked on “Register”').isVisible()); // false
        console.log(await page.locator('#apple_check').isChecked()); // false
        console.log(await page.locator('#testing_image').isHidden()); // true

        // This is useful when an element popping up sometimes and not the other times (modal) 
        if(await page.getByText('You clicked on “Register”').isVisible()) {
            // then do something - handle it as expected
        }
    });

    test.fail('Element assertions', async({ page }) => {
        expect(page.getByText('You clicked on “Register”')).not.toBeVisible();
    });

    test('Element properties', async({ page }) => {
        const unorderedList = page.locator('#unordered_list');

        console.log('1', await unorderedList.innerText()); 
        expect(await unorderedList.innerText()).toContain('JavaScript');

        // expect(await unorderedList.allInnerTexts()).toContain('JavaScript');
        // expect(await unorderedList.allTextContents()).toContain('JavaScript');
        /*
        JavaScript
        Java
        C#
        */
        console.log('2', await unorderedList.allInnerTexts()); // [ 'JavaScript\nJava\nC#' ]
        console.log('3', await unorderedList.allTextContents()); // [ 'JavaScriptJavaC#' ]
        console.log('4', await unorderedList.textContent()); // JavaScriptJavaC#

        console.log('5', await unorderedList.innerHTML()); // <li id="unordered_list_item1">JavaScript</li><li id="unordered_list_item2">Java</li><li id="unordered_list_item3">C#</li>
        console.log('6', await unorderedList.count()); // 1
    });

    // We can use this method whenever we are restricted with playwright to run JS code within our script
    test.only('Evaluate method to run JS code', async({ page }) => {
        await page.evaluate(() => {
            document.getElementById("hello_paragraph")!.style.color = "red"
        });
    })
});