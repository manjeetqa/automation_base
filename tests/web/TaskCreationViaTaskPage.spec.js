// // Task003 : Test for Create Task and validate via Tasks page.

// import fs from 'fs';
// const { test, expect } = require('@playwright/test');
// import { LoginPage } from '../../pageobjects/LoginPage';
// import { TaskPage } from '../../pageobjects/TaskPage';

// // Load configuration data
// const config = fs.readFileSync('config/dev_env.env', 'utf8');
// const lines = config.split('\n');
// const BASE_URL = lines.find(line => line.startsWith('BASE_URL='))?.split('=')[1]?.trim();
// const EMAIL = lines.find(line => line.startsWith('email='))?.split('=')[1]?.trim();
// const CODE = lines.find(line => line.startsWith('CODE='))?.split('=')[1]?.trim();

// const testData = JSON.parse(fs.readFileSync('testdata/testdata.json', 'utf8'));

// test('Create Task and validate via Tasks page', { tag: ['@TC003'] }, async ({ page }) => {

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
//   await expect(taskPage.taskLink).toBeVisible();
  
//   // Step 4: Create task from Tasks page
//   await taskPage.createTaskFromTaskPage('task001');
  
//   // Step 5: Verify task creation message
//   await taskPage.verifyTaskCreationMessage();
// });