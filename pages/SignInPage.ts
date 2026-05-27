import { Page, Locator } from "@playwright/test";

export class SignInPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly passwordReveal: Locator;
  readonly loginBtn: Locator;
  readonly registerLink: Locator;
  readonly forgotPasswordLink: Locator;

  constructor(private page: Page) {
    this.emailInput = this.page.locator("#email");
    this.passwordInput = this.page.locator("#password");
    this.passwordReveal = this.page.locator("div.input-group-append");
    this.loginBtn = this.page.locator("input[data-test='login-submit']");
    this.registerLink = this.page.locator("a[data-test='register-link']");
    this.forgotPasswordLink = this.page.locator(
      "a[data-test='forgot-password-link']",
    );
  }

  async goToSignInPage() {
    await this.page.goto("/auth/login");
  }

  async signInAccount(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }

  async goToRegistrationPage() {
    await this.registerLink.click();
  }

  async goToForgotPasswordPage() {
    await this.forgotPasswordLink.click();
  }

  getErrorMsg() {
    return this.page.locator("div.help-block");
  }

  getLoginTab() {
    return this.page.locator("button[data-test='nav-menu']");
  }
}
