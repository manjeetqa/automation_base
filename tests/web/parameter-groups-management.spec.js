// this below test is for managing parameter groups - adding and deleting a template parameter
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pageobjects/LoginPage';
import { ParameterGroupsPage } from '../../pageobjects/ParameterGroupsPage';

const BASE_URL = process.env.BASE_URL;
const email = process.env.email;
const CODE = process.env.CODE;

test.describe('Parameter Groups Management', () => {
  test('Manage Parameter Groups - Add and Delete Template', async ({ page }) => {
    // Step 1: Login
    const loginPage = new LoginPage(page);
    await page.goto(BASE_URL);
    await loginPage.login(email, CODE);

    // Step 2: Click on Parameter Groups
    const parameterGroupsPage = new ParameterGroupsPage(page);
    await parameterGroupsPage.navigateToParameterGroups();

    // Step 3: Search for 'PG1' & click the 1st option which ends ID | Name with " PG1"
    await parameterGroupsPage.searchAndSelectPG1();

    // Step 4: Click on 'add parameter' button near to the manage parameters.
    await parameterGroupsPage.addTemplateParameter();

    // Step 5: Hover over the template & click on pencil icon
    await parameterGroupsPage.deleteTemplateParameter();

    // Step 6: Validate 'Parameter Group Updated successfully' text on top right.
    const successMessage = await parameterGroupsPage.getSuccessMessage();
    await expect(successMessage).toBeVisible();

  });
});
