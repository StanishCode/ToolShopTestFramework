import { Page, Locator } from "@playwright/test";
import { UIUser } from "../types";

export class RegisterPage {
  //TODO: need locators for error messages
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly dobInput: Locator;
  readonly countryDropdown: Locator;
  readonly postalCodeInput: Locator;
  readonly houseNumInput: Locator;
  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly phoneNumInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly passwordReveal: Locator;
  readonly passwordHelpList: Locator;
  readonly passwordStrenthBar: Locator;
  readonly registrationBtn: Locator;

  constructor(private page: Page) {
    this.firstNameInput = this.page.locator("input[data-test='first-name']");
    this.lastNameInput = this.page.locator("input[data-test='last-name']");
    this.dobInput = this.page.locator("input[data-test='dob']");
    this.countryDropdown = this.page.locator("select[data-test='country']");
    this.postalCodeInput = this.page.locator("input[data-test='postal_code']");
    this.houseNumInput = this.page.locator("input[data-test='house_number']");
    this.streetInput = this.page.locator("input[data-test='street']");
    this.cityInput = this.page.locator("input[data-test='city']");
    this.stateInput = this.page.locator("input[data-test='state']");
    this.phoneNumInput = this.page.locator("input[data-test='phone']");
    this.emailInput = this.page.locator("input[data-test='email']");
    this.passwordInput = this.page.locator("input[data-test='password']");
    this.passwordReveal = this.page.locator("div.input-group-append button");
    this.registrationBtn = this.page.locator(
      "button[data-test='register-submit']",
    );
    //these may be need to be dynamic since styling changes based on input
    this.passwordHelpList = this.page.locator("#passwordHelp");
    this.passwordStrenthBar = this.page.locator("div.strength-bar");
  }

  async gotoRegisterPage() {
    await this.page.goto("/auth/register", { waitUntil: "domcontentloaded" });
  }

  async submitRegistrationForm(customerData: UIUser) {
    await this.firstNameInput.fill(customerData.first_name);
    await this.lastNameInput.fill(customerData.last_name);
    await this.dobInput.fill(customerData.dob);
    await this.countryDropdown.selectOption(customerData.address.country);
    await this.postalCodeInput.fill(customerData.address.postal_code);
    await this.houseNumInput.fill(customerData.address.house_num);
    await this.streetInput.fill(customerData.address.street);
    await this.cityInput.fill(customerData.address.city);
    await this.stateInput.fill(customerData.address.state);
    await this.phoneNumInput.fill(customerData.phone);
    await this.emailInput.fill(customerData.email);
    await this.passwordInput.fill(customerData.password);
    await this.registrationBtn.click();
  }

  async enterFistName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

  async enterLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }

  async enterDOB(dob: string) {
    await this.dobInput.fill(dob);
    await this.dobInput.blur();
  }

  async enterPhoneNum(phoneNum: string) {
    await this.phoneNumInput.fill(phoneNum);
    await this.phoneNumInput.blur();
  }

  async enterEmail(email: string) {
    await this.emailInput.fill(email);
    await this.emailInput.blur();
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
    await this.passwordInput.blur();
  }

  async clickRegisterBtn() {
    await this.registrationBtn.click();
  }

  getPasswordHelpListItems() {
    return this.passwordHelpList.locator("li");
  }

  getFirstNameErrorMsg() {
    return this.page.locator("div[data-test='first-name-error']");
  }

  getLastNameErrorMsg() {
    return this.page.locator("div[data-test='last-name-error']");
  }

  getDOBErrorMsg() {
    return this.page.locator("div[data-test='dob-error']");
  }

  getCountryErrorMsg() {
    return this.page.locator("div[data-test='country-error']");
  }

  getPostalCodeErrorMsg() {
    return this.page.locator("div[data-test='postal_code-error']");
  }

  getHouseNumErrorMsg() {
    return this.page.locator("div[data-test='house_number-error']");
  }

  getStreetErrorMsg() {
    return this.page.locator("div[data-test='street-error']");
  }

  getCityErrorMsg() {
    return this.page.locator("div[data-test='city-error']");
  }

  getStateErrorMsg() {
    return this.page.locator("div[data-test='state-error']");
  }

  getPhoneErrorMsg() {
    return this.page.locator("div[data-test='phone-error']");
  }

  getEmailErrorMsg() {
    return this.page.locator("div[data-test='email-error']");
  }

  getPasswordErrorMsg() {
    return this.page.locator("div[data-test='password-error']");
  }
}
