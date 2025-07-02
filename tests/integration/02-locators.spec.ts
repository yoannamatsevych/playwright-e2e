import { test, Locator } from "@playwright/test";

test.use({
  launchOptions: {
    slowMo: 500,
  },
});

test.describe("Playwright Locators", () => {
  test("Playwright locator() API", async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/");

    // await page.click('#myLocator')

    // let myLocator: Locator

    // myLocator = page.locator('#myLocator')

    // await myLocator.click()

    await page.locator("#logo").click();
    await page.click("#logo");

    const myLogo: Locator = page.locator("#logo");
    await myLogo.click();
  });

  test("Playwright - Custom Pseudo Classes", async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/frontend");

    // const cards: Locator = page.locator('.card:has-text("HTML Elements")')
    const cards: Locator = page.locator(".card");

    await cards.locator(':has-text("HTML Elements")').click();
    // await page.locator(".card", { hasText: "HTML Elements" }).click();

    await page.locator('button:has-text("Register")').click();
    await page.locator('button:has-text("Sign in"):enabled').highlight();
    await page.locator('button:has-text("Sign in"):visible').highlight();

    const countOfDivs = await page.locator("#radio-button-group div").count();

    console.log(countOfDivs + " is the amount of div elements radio group has");

    const javaRadioButton = page.locator("#radio_1_option_1");
    const javaParentDiv = page.locator("#radio-button-group div", {
      has: javaRadioButton,
    });

    console.log((await javaParentDiv.count()) + " is the real amount we need");

    const javaParentDiv2 = page.locator("#radio-button-group div", {
      hasNot: javaRadioButton,
    });

    console.log(
      (await javaParentDiv2.count()) +
        " is the amount of web elements except java button"
    );
  });

  test("Chaining the Locators", async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/frontend");

    await page.locator('.card:has-text("HTML Elements")').click();

    const unorderedList = page.locator("#unordered_list");

    // await page.locator('#unordered_list_item1').highlight()
    await unorderedList.locator("#unordered_list_item1").highlight();
  });

  test("Handling multiple elements", async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/frontend");

    await page.locator('.card:has-text("HTML Elements")').click();

    const unorderedList = page.locator("#unordered_list > li");

    await unorderedList.first().click();
    await unorderedList.nth(1).click();
    await unorderedList.last().click();

    // This will return a failure because Playwright will find more than 1 element which violates the 'strict' mode
    // await unorderedList.click()

    const checkboxGroup: Locator = page.locator("#checkbox-button-group input");
    const checkboxCount = await checkboxGroup.count();

    // for (let i = 0; i < checkboxCount; i++) {
    //   await checkboxGroup.nth(i).check();
    // }

    const checkboxArray: Locator[] = await checkboxGroup.all();

    for (const checkbox of checkboxArray) {
      await checkbox.check();
    }

    // checkboxArray.forEach(async (el, index) => {
    //   await el.check();
    //   console.log(index + " INDEX OF ELEMENT");
    // });
  });

  test("Playwright built-in locators", async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/frontend");
    await page
      .getByRole("link", { name: "HTML Elements", exact: true })
      .click();

    await page.getByRole("heading", { name: "HTML Elements" }).highlight();

    await page.getByRole("button", { name: "Register " }).click();

    await page.getByPlaceholder("Enter text here").fill("TechGlobal");

    const buttonsWrapper = page.locator('[data-identifier="Buttons"]');

    buttonsWrapper.getByRole("button", { name: "Sign in" }).click();

    await buttonsWrapper
      .locator("button")
      .getByText("Register", { exact: true })
      .click();
  });

  test("filter() locator API", async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/frontend");
    await page
      .getByRole("link", { name: "HTML Elements", exact: true })
      .click();

    const testingParagraph = page.locator("p").filter({ hasText: "testing" });
    await testingParagraph.highlight()

    const languageHeadings = await page.locator('label').count()
    console.log(`Amount of elements with label tag is: ${languageHeadings}`)

    const noneLanguageHeadings = await page.locator('label').filter({ hasNotText: 'Java'}).count()
    
    console.log(`Amount of elements with label tag but Java is: ${noneLanguageHeadings}`)

    const wrappersCount = await page.locator('[data-identifier*="a"]').count()

    console.log(`Located wrappers are: ${wrappersCount}`)

    const uniqueWrapper = await page.locator('[data-identifier*="a"]').filter({ has: page.locator('#java_radio')}).count()

    console.log(`Located wrappers after filter is: ${uniqueWrapper}`)
  });
});