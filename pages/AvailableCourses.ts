import {Locator, Page} from '@playwright/test'

class AvailableCourses{
    readonly page: Page;
    readonly heading: Locator;
    readonly all3Courses: Locator;
    readonly courseImg: Locator;
    readonly courseTitle: Locator;
    readonly courseTag: Locator;
    readonly coursePrice: Locator;
    readonly placeOrderButton: Locator;
    readonly discountTags: Locator;
    readonly addToCartButtons: Locator;
    readonly addedItemsToTheCart: Locator;
    readonly headerOnAddedItemsOnTheCart: Locator;
    readonly totalPrice: Locator;
    readonly addedToCartImgs: Locator;
    readonly addedToCartTitles: Locator;
    readonly addedToCartPrices: Locator;
    readonly addedToCartDiscount: Locator;


    constructor(page: Page){
        this.page = page;
        this.heading = this.page.locator('.section>h1')
        this.all3Courses = this.page.locator('[id ^="course"]')
        this.courseImg = this.page.locator('[id ^="course"] img')
        this.courseTitle = this.page.locator('[id ^="course"] h3')
        this.courseTag = this.page.locator('.my-3')
        this.coursePrice = this.page.locator('[data-testid="full-price"]')
        this.placeOrderButton = this.page.getByRole('button', {name: 'Place Order'})
        this.discountTags = this.page.locator('[data-testid="discount"]');
        this.addToCartButtons = this.page.locator('[id^="course"] button');
        this.addedItemsToTheCart = this.page.locator('.p-2>div');
        this.headerOnAddedItemsOnTheCart = this.page.getByText('Items Added to Cart');
        this.totalPrice = this.page.locator('#total-price');
        this.addedToCartImgs = this.page.locator('.course-card >img');
        this.addedToCartTitles = this.page.locator('.mt-1.has-text-black');
        this.addedToCartPrices = this.page.locator('[data-testid="final-price"]');
        this.addedToCartDiscount = this.page.locator('[data-testid="discount"]');


    }

    courses: { title: string; tag: string; price: number; discount : number, accountDiscount() : void }[] = [{
        title: "SDET Course | Cypress Playwright",
        tag: "TechGlobal School",
        price: 100,
        discount: 20,
        accountDiscount(){
            return this.price - (this.price * this.discount / 100)
        }
    },
    {
        title: "Playwright Automation Testing",
        tag: "TechGlobal School",
        price: 80,
        discount: 10,
        accountDiscount(){
            return this.price - (this.price * this.discount / 100)
        }
    },
    {
        title: "Cypress Automation Course",
        tag: "TechGlobal School",
        price: 10,
        discount: 0,
        accountDiscount(){
            return this.price - (this.price * this.discount / 100)
        }
    }
]

    getNumberFromString(price: string){
       return Number(price.split('$')[1]);
    }

    async clickOnThaAddToCart(cardTitle: string, i: number){
        if(cardTitle === await this.courseTitle.nth(i).innerText()){
           await this.addToCartButtons.nth(i).click()
        }
    }
}

export{AvailableCourses}