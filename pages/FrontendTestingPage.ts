import {Locator, Page} from '@playwright/test'
import { BasePage } from './BasePage';

class FrontendTestingPage extends BasePage{

    constructor(page: Page){
        super(page)

        //Locators
    }


    async clickOnCard(cardText: string){
        await this.page.getByRole('link', {name: cardText, exact: true}).click();
    }
}

export{FrontendTestingPage}