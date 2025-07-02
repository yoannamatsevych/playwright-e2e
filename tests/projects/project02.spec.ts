import {test, expect} from "@playwright/test";
import {AvailableCourses} from '../../pages/AvailableCourses'

test.describe('Project 02', () => {
    /*
Navigate to https://techglobal-training.com/frontend/shopping-cart
Validate the heading is “Available Courses”
Validate that there are 3 courses displayed
Validate that each course has an image, name, TechGlobal School tag, and a price of more than zero
Validate the first 2 courses have discount tags
Validate that there is an “Add to Cart” button under each course which is displayed, enabled, and has the text “Add to Cart”
    */
let availableCourses : AvailableCourses;
test.beforeEach(async({page}) => {
    await page.goto('https://techglobal-training.com/frontend/shopping-cart');
    availableCourses = new AvailableCourses(page);
})

test('Test Case 01 - Available Courses Section Validation', async ({page}) => {
    await expect(availableCourses.heading).toBeVisible();
    await expect(availableCourses.heading).toHaveText('Available Courses');
    await expect(availableCourses.all3Courses).toHaveCount(3);

    for(let i = 0; i < await availableCourses.all3Courses.count(); i++){
        await expect(availableCourses.courseImg.nth(i)).toBeVisible()
        await expect(availableCourses.courseTitle.nth(i)).toBeVisible();
        await expect(availableCourses.courseTag.nth(i)).toBeVisible();
        await expect(availableCourses.coursePrice.nth(i)).toBeVisible();
        const price = await availableCourses.coursePrice.nth(i).innerText();
        expect(availableCourses.getNumberFromString(price)).toBeGreaterThan(0);

        if( await availableCourses.courseTitle.nth(i).innerText() === "SDET Course | Cypress Playwright" ||
            await availableCourses.courseTitle.nth(i).innerText() === "Playwright Automation Testing"){
            await expect(availableCourses.discountTags.nth(i)).toBeVisible();
        }

        await expect(availableCourses.addToCartButtons.nth(i)).toBeVisible();
        await expect(availableCourses.addToCartButtons.nth(i)).toBeEnabled();
        expect(await availableCourses.addToCartButtons.nth(i).innerText()).toBe('Add to Cart');

    }

})

    test('Test Case 02 - Cart Section Validation', async ({page}) => {
        /*
Navigate to https://techglobal-training.com/frontend/shopping-cart
Validate the heading is “Items Added to Cart”
Validate that the cart is empty by default
Validate that the total price is zero “$0” by default
Validate that there is a “Place Order” button is displayed, disabled, and has the text “Place Order”
        */
    expect(await availableCourses.headerOnAddedItemsOnTheCart.innerText()).toBe('Items Added to Cart');
    expect(await availableCourses.addedItemsToTheCart.count()).toBe(0);
    const totalPrice = await availableCourses.totalPrice.innerText()
    expect(`$${availableCourses.getNumberFromString(totalPrice)}`).toBe('$0');
    await expect(availableCourses.placeOrderButton).toBeVisible();
    await expect(availableCourses.placeOrderButton).toBeDisabled();
    expect(await availableCourses.placeOrderButton.innerText()).toBe('Place Order');
    
    })

    test('Test Case 03 - Add a Course to the Cart and Validate', async({page}) => {
        /*
Navigate to https://techglobal-training.com/frontend/shopping-cart
Click on the “Add to Cart” button for one of the courses
Validate that the course is displayed in the cart with its image, name, and discount amount if available
Validate that the course price is added to the total price excluding the discount amount
Click on the “Place Order” button
Validate a success message is displayed with the text “Your order has been placed.”
Validate that the cart is empty
        */

    let index = 0;
    await availableCourses.clickOnThaAddToCart(await availableCourses.courseTitle.nth(index).innerText(), index);
    for(let i = 0; i <= index; i++){
    expect(availableCourses.addedToCartImgs.nth(i)).toBeVisible()
    expect(availableCourses.addedToCartTitles.nth(i)).toBeVisible()
    expect(availableCourses.addedToCartPrices.nth(i)).toBeVisible()
    if( await availableCourses.courseTitle.nth(i).innerText() === "SDET Course | Cypress Playwright" ||
            await availableCourses.courseTitle.nth(i).innerText() === "Playwright Automation Testing"){
            await expect(availableCourses.addedToCartDiscount.nth(i)).toBeVisible();
        }
    }
    
    })
})
