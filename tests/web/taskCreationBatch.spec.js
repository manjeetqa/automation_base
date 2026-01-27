// // Task002 : Create and Open Task and validate TC with Batch radio button selected

// import fs from 'fs';
// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../../pageobjects/LoginPage';
// import { TaskPage } from '../../pageobjects/TaskPage';
// import { updateSpecificDataType } from '../../testdata/dataSetGenerator';

// // Load configuration data
// const config = fs.readFileSync('config/dev_env.env', 'utf8');
// const lines = config.split('\n');
// const BASE_URL = lines.find(line => line.startsWith('BASE_URL='))?.split('=')[1]?.trim();
// const EMAIL = lines.find(line => line.startsWith('email='))?.split('=')[1]?.trim();
// const CODE = lines.find(line => line.startsWith('CODE='))?.split('=')[1]?.trim();

// const testData = JSON.parse(fs.readFileSync('testdata/testdata.json', 'utf8'));

// test('Create and Open Task and validate', { tag: ['@TC002'] }, async ({ page }) => {
//   await page.setViewportSize({ 
//       width: testData.viewport.width, 
//       height: testData.viewport.height 
//   });

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
  
//   // Step 3: Create batch task
//   await taskPage.createBatchTask('task002');
  
//   // Step 4: Click empty button and create & open
//   await taskPage.clickEmptyButton();
//   const popupPage = await taskPage.createAndOpenTask('task002');
  
//   // Step 5: Navigate to popup URL and validate
//   await popupPage.goto('https://dev.albertinventdev.com/#altask/detail?query=LAB2869818');
//   const popupTaskPage = new TaskPage(popupPage);
//   await popupTaskPage.verifyTaskInDialog('task001');
// });


