// // Task004 : Test for Task Search functionality

// import fs from 'fs';
// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../../pageobjects/LoginPage';
// import { TaskPage } from '../../pageobjects/TaskPage';

// // Load configuration data
// const config = fs.readFileSync('config/dev_env.env', 'utf8');
// const lines = config.split('\n');
// const BASE_URL = lines.find(line => line.startsWith('BASE_URL='))?.split('=')[1]?.trim();
// const EMAIL = lines.find(line => line.startsWith('email='))?.split('=')[1]?.trim();
// const CODE = lines.find(line => line.startsWith('CODE='))?.split('=')[1]?.trim();
// const testData = JSON.parse(fs.readFileSync('testdata/testdata.json', 'utf8'));

// test('Test for Task Search functionality', { tag: ['@TC004'] }, async ({ page }) => {

//   await page.setViewportSize({ 
//       width: testData.viewport.width, 
//       height: testData.viewport.height 
//     });
    
//   // Initialize Page Objects
//   const loginPage = new LoginPage(page);
//   const taskPage = new TaskPage(page);

//   // Step 1: Navigate to login page
//   await page.goto(BASE_URL);

//   // Step 2: Login process
//   await loginPage.clickAddNewAccount();
//   await loginPage.enterEmail(EMAIL);
//   await loginPage.clickContinue();
//   await loginPage.clickSigninWithAuthenticator();
//   await loginPage.enterAuthenticatorCode(CODE);
//   await loginPage.clickContinueForAuth();
//   await loginPage.clickReleaseNotesOk();
  
//   // Step 3: Verify Tasks link is visible
//   await expect(taskPage.tasksLink).toBeVisible();
  
//   // Step 4: Search for task
//   await taskPage.searchTask('task001');
  
//   // Step 5: Verify search results in grid
//   await taskPage.verifySearchInGrid('task001');
// });




// ***************************
// Below is the code for debugging purpose

// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('https://dev.albertinventdev.com/albert.html#login/selectUser?target=center&redirect=/albert.html');
//   await page.locator('.list').click();
//   await page.getByRole('textbox', { name: 'john.doe@company.com' }).click();
//   await page.getByRole('textbox', { name: 'john.doe@company.com' }).fill('appstore_ten0@albertinvent.com');
//   await page.getByRole('button', { name: 'Continue' }).click();
//   await page.getByRole('button', { name: 'Sign in with Authenticator' }).click();
//   await page.getByRole('textbox', { name: 'e.g.' }).click();
//   await page.getByRole('textbox', { name: 'e.g.' }).fill('123456');
//   await page.getByRole('button', { name: 'Continue' }).click();
//   await page.getByRole('button', { name: 'Ok' }).click();
//   await page.getByRole('link', { name: 'Inventory' }).click();

//   // get the text using css locator and print
// //   const text = await page.locator('css=div[role="gridcell"][col-id="manufacturer"]').textContent();
// //   const text = await page.locator('col-id="manufacturer"').textContent();

//   const text = await page.locator('div[role="gridcell"][comp-id="746"]').first().textContent();
//   console.log('Locator Text:', text);
   
// //   await expect(page.getByRole('grid')).toContainText('tjcb5imfrw69zrvgou7xep6uiw5wvfspisbipryj9l84xjbxjqlfiqm872esliqqfbyw2zae6yoa');
// });