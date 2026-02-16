import { Page, expect, Locator } from "@playwright/test";

//TODO: need to add advanced action methods and necessary locators
export class LoginPage {
  private readonly page: Page;
  private readonly email: Locator;
  private readonly password: Locator;
  private readonly showPassword: Locator;
  private readonly login: Locator;
  private readonly register: Locator;
  private readonly forgotPassword: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = page.locator("#email");
    this.password = page.locator("#password");
    this.showPassword = page.locator(".input-group button");
    this.login = page.locator('[data-test="login-submit"]');
    this.register = page.locator('[data-test="register-link"]');
    this.forgotPassword = page.locator('[data-test="forgot-password-link"]');
  }

  async enterEmail(email: string) {
    await this.email.fill(email);
  }

  async enterPassword(password: string) {
    await this.password.fill(password);
  }

  async clickShowPassword() {
    await this.showPassword.click();
  }

  async clickLogin() {
    await this.login.click();
  }

  async clickRegister() {
    await this.register.click();
  }

  async clickForgotPassword() {
    await this.forgotPassword.click();
  }
}
