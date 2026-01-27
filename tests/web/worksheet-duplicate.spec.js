// worksheet-duplicate.spec.js
// this below test is for creating a worksheet and duplicating it
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pageobjects/LoginPage';
import { ProjectPage } from '../../pageobjects/ProjectPage';
import { WorksheetPage } from '../../pageobjects/WorksheetPage';

const BASE_URL = process.env.BASE_URL;
const email = process.env.email;
const CODE = process.env.CODE;

test.describe('Worksheet Creation and Duplication', () => {
  test('Create Main Sheet and Duplicate', async ({ page }) => {
    // Step 1: Login
    const loginPage = new LoginPage(page);
    await page.goto(BASE_URL);
    await loginPage.login(email, CODE);

    // Step 2: Create Project
    const projectPage = new ProjectPage(page);
    await projectPage.createProject('PROJECT_003');

    // Step 3: Create Worksheet
    const worksheetPage = new WorksheetPage(page);
    await worksheetPage.createWorksheet('Main_Sheet');
    
    // Wait for worksheet to be created and tab to appear
    await page.waitForTimeout(3000);

    // Step 4: Duplicate Sheet
    const frame = page.locator('albert-alproject iframe').contentFrame();

    // sleep for 5 seconds to ensure sheet is created
    // await page.waitForTimeout(10000);
    
    // this.worksheetFrame = page.frameLocator('albert-alproject iframe');
    // const ManufacturerText= await expect(this.worksheetFrame.locator('xpath= (//div[@col-id="manufacturer"])[1]')).textContent();
    // console.log('Frame Text:', ManufacturerText);

    // Main sheet tab
    const mainSheet = frame.locator('a', { hasText: 'Main_Sheet' });

    // wait until sheet tab is visible
    await mainSheet.waitFor({ state: 'visible' });

    // hover to reveal three-dot menu
    await mainSheet.hover();

    // three-dot (more options) button for the selected tab
    const moreOptionsBtn = frame.locator('div.tab-label.selected span');

    // wait until menu button is clickable
    await moreOptionsBtn.waitFor({ state: 'visible' });

    // click the three-dot menu
    await moreOptionsBtn.click();

    await frame.getByText('Duplicate sheet').waitFor({ state: 'visible' });
    await frame.getByText('Duplicate sheet').click();

    // Name Duplicate Sheet
    await page.locator('albert-alproject iframe').contentFrame().locator('app-duplicate-sheet').getByRole('textbox').fill('duplicate_Main_sheet');

    // await 
    await page.locator('albert-alproject iframe').contentFrame().locator('xpath=(//div[@class="panel-list"]/div)[1]').click();
    await page.locator('albert-alproject iframe').contentFrame().locator('xpath=(//div[@class="columns-list"]//input)[1]').click();

    // Confirm
    await page.locator('albert-alproject iframe').contentFrame().getByRole('button', { name: 'Create' }).click();

    //verify text for duplicate sheet creation
    await expect(frame.getByText('Sheet created successfully')).toBeVisible();

    // Verification: Ensure that the duplicate sheet is created and visible in the sheet tabs.
    const duplicateSheet = frame.locator("xpath=//div[contains(text(),' duplicate_Main_sheet ')]");
    await expect(duplicateSheet).toBeVisible();
  });
});