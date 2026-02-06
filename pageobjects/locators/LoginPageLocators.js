export class LoginPageLocators {
  constructor(page) {
    this.page = page;

    // JS + XPath Locators
    this.addNewAccountBtn = '.list';
    this.emailInput = page.getByRole('textbox', { name: 'john.doe@company.com' });
    this.continueBtn = page.getByRole('button', { name: 'Continue' });
    this.signinAuthenticatorBtn = page.getByRole('button', { name: 'Sign in with Authenticator' });
    this.authenticatorCodeInput = page.getByRole('textbox', { name: 'e.g.' });
    this.releaseNotesOkBtn = page.getByRole('button', { name: 'Ok' });

    this.userMenuBtn = page.getByText('AP', { exact: true });
    this.logoutOption = page.locator('.list.container-item.small.negative');

    // Additional locators for alternative login method
    this.addAccountBtn = '.list';
    this.signInWithAuthenticatorBtn = page.getByRole('button', { name: 'Sign in with Authenticator' });
    this.authCodeInput = page.getByRole('textbox', { name: 'e.g.' });
    this.okBtn = page.getByRole('button', { name: 'Ok' });
  }
}

module.exports = { LoginPageLocators };
