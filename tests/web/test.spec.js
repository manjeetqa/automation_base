
import { test, expect } from '@playwright/test';

test('test', { tag: ['@TC015'] }, async ({ page }) => {
  
  await page.goto('https://www.orangehrm.com/en/30-day-free-trial');
  await page.getByRole('textbox', { name: 'Name for the Trial System' }).fill('Manjeet');
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.getByRole('textbox', { name: 'Full Name' }).fill('sarvy');
  await page.getByRole('textbox', { name: 'Email' }).fill('sarvy@gmail.com');
  await page.getByRole('textbox', { name: 'Phone Number' }).fill('91514151678');
  await page.getByLabel('Country').selectOption('Algeria');

  await page.locator('iframe[name="a-fiy59n5msbhi"]').contentFrame().getByRole('checkbox', { name: 'I\'m not a robot' }).click();
  await page.locator('#Form_getForm_action_submitForm').click();
  await page.getByRole('button', { name: 'Close banner' }).click();

});