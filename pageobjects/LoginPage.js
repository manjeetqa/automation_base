import { expect } from '@playwright/test';
// import Module from 'node:module';
import { UIHelper } from '../utils/uiHelper';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.ui = new UIHelper(page);

    // JS + XPath Locators
    this.addNewAccountBtn = '.list';
    this.emailInput = page.getByRole('textbox', { name: 'john.doe@company.com' });
    this.continueBtn = page.getByRole('button', { name: 'Continue' });
    this.signinAuthenticatorBtn = page.getByRole('button', { name: 'Sign in with Authenticator' });
    this.authenticatorCodeInput = page.getByRole('textbox', { name: 'e.g.' });
    this.releaseNotesOkBtn = page.getByRole('button', { name: 'Ok' });

    this.userMenuBtn = page.getByText('AP', { exact: true });
    this.logoutOption = page.locator('.list.container-item.small.negative');
  }

  // Action Methods
  async clickAddNewAccount() {
    await this.page.locator(this.addNewAccountBtn).click();
  }

  async enterEmail(email) {
    await this.emailInput.click();
    await this.emailInput.fill(email);
  }

  async clickContinue() {
    await this.continueBtn.click();
  }

  async clickSigninWithAuthenticator() {
    await this.signinAuthenticatorBtn.click();
  }

  async enterAuthenticatorCode(code) {
    await this.authenticatorCodeInput.click();
    await this.authenticatorCodeInput.fill(code);
  }

  async clickContinueForAuth() {
    await this.continueBtn.click();
  }

  async clickReleaseNotesOk() {
    await this.releaseNotesOkBtn.click();
  }

  // Business Logic Methods
  async addNewAccount(email) {
    await this.clickAddNewAccount();
    await this.enterEmail(email);
    await this.clickContinue();
  }

  async signInWithAuthenticator(code) {
    await this.clickSigninWithAuthenticator();
    await this.enterAuthenticatorCode(code);
    await this.clickContinueForAuth();
  }

  async dismissReleaseNotes() {
    await this.clickReleaseNotesOk();
  }

  // Verification Methods
  async verifyLoginSuccess() {
    await expect(this.page.getByRole('button', { name: 'Create' })).toBeVisible();
  }

  // **************FROM ANOTHER DIRECTORY*************

  async login(email, code) {
    await this.ui.click(this.addAccountBtn);
    await this.ui.fill(this.emailInput, email);
    await this.ui.click(this.continueBtn);
    await this.ui.click(this.signInWithAuthenticatorBtn);
    await this.ui.fill(this.authCodeInput, code);
    await this.ui.click(this.continueBtn);
    await this.ui.click(this.okBtn);
  }

  async logout() {
    await this.ui.click(this.userMenuBtn);
    await this.ui.click(this.logoutOption);
  }
}

module.exports = { LoginPage };