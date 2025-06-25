import { test, chromium } from "@playwright/test";

test.describe("Playwright 101", () => {
  // This below 'test' function will trigger the test runner
  test("Playwright 101", () => {
    // Test to be executed.
    console.log("TechGlobal");
  });

  // test("Playwright 101 - Test Case 2", ({ page }) => {
  //   // const users = {
  //   //   id: 1,
  //   //   name: "Yahya",
  //   //   age: 32,
  //   // };

  //   // const { id, name, age } = users;
  //   // console.log(id);

  //   const users = [
  //     {
  //       id: 1,
  //       name: "Yahya",
  //       age: 32,
  //     },
  //         {
  //       id: 2,
  //       name: "Tolganai",
  //       age: 33,
  //     },
  //         {
  //       id: 3,
  //       name: "Aziz",
  //       age: 34,
  //     },
  //   ];

  //   const [{id, name, age}] = users

  //   // Object destructure in the callback
  //   users.forEach(({ id, name, age }) => {
  //     console.log(id)
  //     console.log(name)
  //     console.log(age)
  //   })
  // });

  // Marks function as asynchornbous using `async` keyword
  // meaning it might  take some time to complete
  // test("Playwright 101 - Test Case 3", async ({ page }) => {
  //   // The await keyword pauses function execution untill the Promise is resolved,
  //   // making sure code runs only after the Promise is fulfilled or rejected.
  //   await page.goto("https://www.techglobal-training.com/");
  // });


// Given('User navigates the {string}', async ({ page }) => {

// })

test('Playwright 101 -  Cucumber Syntax', async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto('https://www.techglobal-training.com/')

  await page.close()
})

test('Playwright 101 -  Browser Fixture', async ({ browser }) => {
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto('https://www.techglobal-training.com/')

  await page.close()
})

test('Playwright 101 -  Context Fixture', async ({ context }) => {
  const page = await context.newPage()

  await page.goto('https://www.techglobal-training.com/')

  await page.close()
})

test('Playwright 101 -  Multiple Fixture', async ({ page, browser, context }) => {
  // const page = await context.newPage()

  await page.goto('https://www.techglobal-training.com/')

  const newTab = await context.newPage()
  await newTab.goto('https://www.google.com')

  await page.close()
})

});