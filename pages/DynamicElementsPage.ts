import {Locator, Page} from '@playwright/test'
import { FrontendTestingPage } from "./FrontendTestingPage";


class DynamicElementsPage extends FrontendTestingPage {
    // instance variables
    readonly box1: Locator;
    readonly box2: Locator;
    readonly boxes: Locator;

    constructor(page: Page) {
        super(page);

        // Locator
        this.box1 = this.page.locator('[id^="box_1"]');
        this.box2 = this.page.locator('[id^="box_2"]');

        this.boxes = this.page.locator('[id^="box_"]');
    }

    // Methods
}

export { DynamicElementsPage };