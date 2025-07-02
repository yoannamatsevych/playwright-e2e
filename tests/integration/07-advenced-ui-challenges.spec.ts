import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('IFrames', () => {
    test.beforeEach(async({ page }) => {
        await page.goto("https://www.techglobal-training.com/");
        await page.hover('#dropdown-testing');
        await page.click('#frontend-option')
    });

    test('IFrames 1', async({ page }) => {
        await page.getByRole('link', { name: 'IFrames' }).click();

        const frame = page.locator('#form_frame');

        const [ fname, lname ] = [ 'John', 'Doe' ];
        
        // IFrame actions
        await frame.contentFrame().locator('#first_name').fill(fname);
        await frame.contentFrame().getByRole('textbox', { name: 'Please enter your last name' }).fill(lname);
        await frame.contentFrame().getByRole('button', { name: 'SUBMIT' }).click();

        await expect(page.locator('#result')).toContainText(`You entered: ${fname} ${lname}`);
    });

    test('IFrames 2', async({ page }) => {
        await page.getByRole('link', { name: 'IFrames' }).click();

        const frame = page.frameLocator('#form_frame');

        const [ fname, lname ] = [ 'Alex', 'Smith' ];
        
        // IFrame actions
        await frame.locator('#first_name').fill(fname);
        await frame.locator('#last_name').fill(lname);
        await frame.locator('#submit').click();

        await expect(page.locator('#result')).toContainText(`You entered: ${fname} ${lname}`);
    });
});

test.describe('Multiple Windows', () => {
    test('Multiple tabs', async({ context }) => {
        test.slow();
        const page1 = await context.newPage();
        await page1.goto('https://www.techglobal-training.com/');
        await page1.getByRole('link', {name: 'See Our Programs'}).click();

        await page1.close(); // close the tab

        const page2 = await context.newPage();
        await page2.goto('https://www.facebook.com/');
        await page2.getByTestId('open-registration-form-button').click()

        await page2.close(); // close the tab

        const page3 = await context.newPage();
        await page3.goto('https://www.wikipedia.org/');
        await page3.locator('#searchInput').fill('Playwright');
        await page3.keyboard.press('Enter');
    });

    test('Multiple tabs when a button/link clicked', async({ page }) => {
        await page.goto('https://www.techglobal-training.com/');

        const [ newTab ] = await Promise.all([
            page.waitForEvent('popup'),
            page.getByRole('link', {name: 'See Our Programs'}).click()
        ]);
        
        await expect(newTab.getByText('What do we offer?')).toBeVisible();
        await page.waitForTimeout(2000);


        await page.bringToFront();
        await page.waitForTimeout(2000);

        await expect(page.getByText('Welcome to TechGlobal')).toBeVisible();
    });
});


test.describe('Alerts | Dialogs', () => { 
    test.beforeEach(async({ page }) => {
        await page.goto("https://www.techglobal-training.com/");
        await page.hover('#dropdown-testing');
        await page.click('#frontend-option');
        await page.getByRole('link', { name: 'Alerts' }).click();
    });

    test('Warrning Alert', async({ page }) => {
        const alerts = page.locator('[id$="alert"]');

        page.once('dialog', dialog => {
            console.log(dialog.message()); // You are on TechGlobal Training application.
            console.log(dialog.type()); // alert
            dialog.accept();
        });

        // Your actions that triggers dialog
        await alerts.first().click();
        expect(await page.locator('#action').innerText()).toBe('You accepted warning by clicking OK.');
    });

    test('Confirmation Alert accept', async({ page }) => {
        const alerts = page.locator('[id$="alert"]');

        page.once('dialog', dialog => {
            console.log(dialog.message()); // Would you like to stay on TechGlobal Training application?
            console.log(dialog.type()); // confirm
            dialog.accept();
        });

        // Your actions that triggers dialog
        await alerts.nth(1).click();
        expect(await page.locator('#action').innerText()).toBe('You confirmed the alert by clicking OK.');
    });

    test('Confirmation Alert reject', async({ page }) => {
        const alerts = page.locator('[id$="alert"]');

        page.once('dialog', dialog => {
            console.log(dialog.message()); // Would you like to stay on TechGlobal Training application?
            console.log(dialog.type()); // confirm
            dialog.dismiss();
        });

        // Your actions that triggers dialog
        await alerts.nth(1).click();
        expect(await page.locator('#action').innerText()).toBe('You rejected the alert by clicking Cancel.');
    });

    test('Prompt Alert reject', async({ page }) => {
        const alerts = page.locator('[id$="alert"]');

        page.once('dialog', dialog => {
            console.log(dialog.message()); // What would you like to say to TechGlobal?
            console.log(dialog.type()); // prompt
            dialog.dismiss();
        });

        // Your actions that triggers dialog
        await alerts.last().click();
        expect(await page.locator('#action').innerText()).toBe('You rejected the alert by clicking Cancel.');
    });

    test('Prompt Alert accept with no prompt', async({ page }) => {
        const alerts = page.locator('[id$="alert"]');

        page.once('dialog', dialog => {
            console.log(dialog.message()); // What would you like to say to TechGlobal?
            console.log(dialog.type()); // prompt
            dialog.accept();
        });

        // Your actions that triggers dialog
        await alerts.last().click();
        expect(await page.locator('#action').innerText()).toBe('You entered "" in the alert and clicked OK.');
    });

    test('Prompt Alert accept with a prompt', async({ page }) => {
        const alerts = page.locator('[id$="alert"]');

        page.once('dialog', dialog => {
            console.log(dialog.message()); // What would you like to say to TechGlobal?
            console.log(dialog.type()); // prompt
            dialog.accept('TechGlobal');
        });

        // Your actions that triggers dialog
        await alerts.last().click();
        expect(await page.locator('#action').innerText()).toBe('You entered "TechGlobal" in the alert and clicked OK.');
    });

    test('Accept all the alerts', async({ page }) => {
        const alerts = page.locator('[id$="alert"]');

        page.on('dialog', dialog => { // this will handle all the alerts that may pop up during the test execution
            console.log(dialog.message()); 
            console.log(dialog.type());
            dialog.accept();
        });

        // Your actions that triggers dialog
        for(let i = 0; i < await alerts.count(); i++) {
            await alerts.nth(i).click();
        }
    });
});

test.describe('File Dowload and Upload', () => {
    test.beforeEach(async ({page}) => {
        await page.goto("https://www.techglobal-training.com/");
        await page.hover('#dropdown-testing');
        await page.click('#frontend-option');
        await page.getByRole('link', { name: 'File Download & Upload' }).click();
    })

    test('File Download', async ({page}) => {

        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.locator('#file_download').click()
        ]
        );

       
        const pathToSave = 'downloads/' + download.suggestedFilename();

        await download.saveAs(pathToSave)

        const downloadDir = path.resolve(__dirname, '../downloads')// downloads/SampleText.txt
        const expectedFilePath = path.join(downloadDir, 'SampleText.txt')

        expect(fs.existsSync(expectedFilePath)).toBeTruthy();

        
    })

    test.only('File Upload happy path txt', async ({page}) => {
        const files = ['downloads/hello.txt', 'downloads/hello.docx', 'downloads/hello.pdf'];
        for(let i = 0; i < files.length; i++){
            await page.locator('#file_upload').setInputFiles(files[i]);
            await page.locator('#file_submit').click();
            files[i] = files[i].replace('downloads/', '')
            await expect(page.locator('#result')).toHaveText(`You uploaded ${files[i]}`)
            await page.waitForTimeout(2000)
        }
        
        
    })

    test('File Upload happy negative test', async ({page}) => {
        
        await page.locator('#file_upload').setInputFiles('downloads/hello.js');
        await page.locator('#file_submit').click();

        await expect(page.locator('#result')).toHaveText('This file type is not allowed. You can try one of the .pdf .txt .pptx .docx .png .jpeg .jpg file types to upload.')
         await page.waitForTimeout(3000)
        
    })
})