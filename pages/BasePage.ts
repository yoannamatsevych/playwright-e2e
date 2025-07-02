import {Locator, Page} from '@playwright/test'

class BasePage{
    readonly page: Page;
    readonly testingDropdown: Locator
    readonly frontendOption: Locator
    readonly backendOption: Locator

    constructor(page: Page){
        this.page = page;

        this.testingDropdown = this.page.locator('#dropdown-testing')
        this.frontendOption = this.page.locator('#frontend-option')
        this.backendOption = this.page.locator('#backend-option')
    }

    async selectFrontendTesting(){
        await this.testingDropdown.hover();
        await this.frontendOption.click();
    }

     async selectBackendTesting(){
        await this.testingDropdown.hover();
        await this.backendOption.click();
    }
}

export {BasePage}