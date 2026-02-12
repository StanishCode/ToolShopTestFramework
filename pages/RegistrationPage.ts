import { Page, expect, Locator } from "@playwright/test";

export class RegistrationPage {
  private readonly page: Page;
  //locators
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly DoB: Locator;
  private readonly streetAddress: Locator;
  private readonly postalCode: Locator;
  private readonly city: Locator;
  private readonly state: Locator;
  private readonly country: Locator;
  private readonly phone: Locator;
  private readonly email: Locator;
  private readonly password: Locator;
  private readonly displayPassword: Locator;
  private readonly registerBtn: Locator;
  //TODO: need to add more locators for validation

  //constructor
  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator("#first_name");
    this.lastName = page.locator("#last_name");
    this.DoB = page.locator("#dob");
    this.streetAddress = page.locator("#street");
    this.postalCode = page.locator("#postal_code");
    this.city = page.locator("#city");
    this.state = page.locator("#state");
    this.country = page.locator("#country");
    this.phone = page.locator("#phone");
    this.email = page.locator("#email");
    this.password = page.locator("#password");
    this.displayPassword = page.locator(".input-group div");
    this.registerBtn = page.getByRole("button", { name: "Register" });
  }

  //actions methods
  async enterFirstName(name: string) {
    await this.firstName.fill(name);
  }

  async enterLastName(name: string) {
    await this.lastName.fill(name);
  }

  async enterDOB(date: string) {
    await this.DoB.fill(date);
  }

  async enterStreetAddress(address: string) {
    await this.streetAddress.fill(address);
  }

  async enterPostalCode(code: string) {
    await this.postalCode.fill(code);
  }

  async enterCity(city: string) {
    await this.city.fill(city);
  }

  async selectCountry(country: string) {
    await this.country.selectOption("United States of America (the)");
  }

  async enterPhoneNumber(number: string) {
    await this.phone.fill(number);
  }

  async enterEmailAddress(email: string) {
    await this.email.fill(email);
  }

  async enterPassword(password: string) {
    await this.password.fill(password);
  }

  async toggleDisplayPassword() {
    await this.displayPassword.click();
  }

  async registerAccount() {
    await this.registerBtn.click();
  }
}
