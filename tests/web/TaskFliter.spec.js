// // Task005 : Test for Filter functionality with Unclaimed Tasks Status.

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

// test('Test for Filter functionality with Unclaimed Tasks Status', { tag: ['@TC005'] }, async ({ page }) => {

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
  
//   // Step 3: Filter unclaimed tasks
//   await taskPage.filterUnclaimedTasks();
  
//   // Step 4: Verify unclaimed status in grid
//   await taskPage.verifyUnclaimedInGrid();
// });