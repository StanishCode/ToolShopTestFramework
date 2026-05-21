import { Page, Locator } from "@playwright/test";

export class CartCheckoutPage {
  readonly continueShoppingBtn: Locator;
  readonly checkoutBtn: Locator;
  readonly stepsIndicator: Locator;
  //The checkout is the same path but has some kind of conditional
  //rendering for each part of the process, so these locators
  //may have to be dynamic rather than saved in a variable
  readonly signInTab: Locator;
  readonly guestTab: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginBtn: Locator;
  readonly guestEmailInput: Locator;
  readonly guestFirstNameIput: Locator;
  readonly guestLastNameInput: Locator;
  readonly continueGuestBtn: Locator;
  readonly loginConfirmation: Locator;
  readonly secondProceed: Locator;
  readonly countryDropdown: Locator;
  readonly postalCodeInput: Locator;
  readonly houserNumInput: Locator;
  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly thirdProceedBtn: Locator;
  readonly paymentMethodDropdown: Locator;
  readonly bankNameInput: Locator;
  readonly bankAcctNameInput: Locator;
  readonly bankAcctNumInput: Locator;
  readonly creditCardNumInput: Locator;
  readonly expDateInput: Locator;
  readonly cvvInput: Locator;
  readonly cardHolderNameInput: Locator;
  readonly installmentDropdown: Locator;
  readonly giftCardNumInput: Locator;
  readonly validationCodeInput: Locator;
  readonly confirmBtn: Locator;
  readonly paymentSuccessMsg: Locator;

  constructor(private page: Page) {
    this.continueShoppingBtn = this.page.locator(
      "button[data-test='continue-shopping']",
    );
    this.checkoutBtn = this.page.locator("button[data-test='proceed-1']");
    this.stepsIndicator = this.page.locator("ul.steps-4.steps-indicator");
    this.signInTab = this.page.locator("a[href='#signin-tab']");
    this.guestTab = this.page.locator("a[href='#guest-tab']");
    this.loginEmailInput = this.page.locator("input[data-test='email']");
    this.loginPasswordInput = this.page.locator("input[data-test='password']");
    this.loginBtn = this.page.locator("input[data-test='login-submit']");
    this.guestEmailInput = this.page.locator("");
    this.guestFirstNameIput = this.page.locator("");
    this.guestLastNameInput = this.page.locator("");
    this.continueGuestBtn = this.page.locator("");
    this.loginConfirmation = this.page.locator("p.ng-star-inserted");
    this.secondProceed = this.page.locator("button[data-test='proceed-2']");
    this.countryDropdown = this.page.locator("select[data-test='country']");
    this.postalCodeInput = this.page.locator("input[data-test='postal_code']");
    this.houserNumInput = this.page.locator("input[data-test='house_number']");
    this.streetInput = this.page.locator("input[data-test='street']");
    this.cityInput = this.page.locator("input[data-test='city']");
    this.stateInput = this.page.locator("input[data-test='state']");
    this.thirdProceedBtn = this.page.locator("button[data-test='proceed-3']");
    this.paymentMethodDropdown = this.page.locator(
      "select[data-test='payment-method']",
    );
    this.bankNameInput = this.page.locator("input[data-test='bank_name']");
    this.bankAcctNameInput = this.page.locator(
      "input[data-test='account_name']",
    );
    this.bankAcctNumInput = this.page.locator(
      "input[data-test='account_number']",
    );
    this.creditCardNumInput = this.page.locator(
      "input[data-test='credit_card_number']",
    );
    this.expDateInput = this.page.locator("input[data-test='expiration_date']");
    this.cvvInput = this.page.locator("input[data-test='cvv']");
    this.cardHolderNameInput = this.page.locator(
      "input[data-test='card_holder_name']",
    );
    this.installmentDropdown = this.page.locator(
      "select[data-test='monthly_installments']",
    );
    this.giftCardNumInput = this.page.locator(
      "input[data-test='gift_card_number']",
    );
    this.validationCodeInput = this.page.locator(
      "input[data-test='validation_code']",
    );
    this.confirmBtn = this.page.locator("button[data-test='finish']");
    this.paymentSuccessMsg = this.page.locator(
      "div[data-test='payment-success-message']",
    );
  }

  async goToCheckout() {
    await this.page.goto("/checkout", { waitUntil: "domcontentloaded" });
  }

  getStepsIndicator() {
    return this.stepsIndicator;
  }

  getCartItems() {
    return this.page.locator("tr", {
      has: this.page.locator("[data-test='product-title']"),
    });
  }

  async isEmptyCartMessageDisplayed() {
    return await this.page
      .getByText("The cart is empty. Nothing to display.")
      .isVisible();
  }

  //TODO: refactor product methods into one method and look into another search method
  async getProductTitle(index: number) {
    return await this.page
      .locator("span.product-title")
      .nth(index)
      .textContent();
  }

  async getProductQuantities(index: number) {
    return await this.page
      .locator("input[data-test='product-quantity']")
      .nth(index)
      .inputValue();
  }

  async setProductQuantities(index: number, amount: string) {
    const quantityInput = this.page
      .locator("input[data-test='product-quantity']")
      .nth(index);
    await quantityInput.click();
    await quantityInput.press("Backspace");
    await quantityInput.fill(amount);
    await quantityInput.blur();
  }

  async getProductPrices(index: number) {
    return await this.page
      .locator("span[data-test='product-price']")
      .nth(index)
      .textContent();
  }

  getProductTotals(index: number) {
    return this.page.locator("span[data-test='line-price']").nth(index);
  }

  getCartTotal() {
    return this.page.locator("td[data-test='cart-total']");
  }

  async removeProduct(index: number) {
    await this.page.locator("td a").nth(index).click();
  }

  getBanner() {
    return this.page.locator("#toast-container");
  }

  async clickContinueShoppingBtn() {
    await this.continueShoppingBtn.click();
  }

  async clickCheckoutBtn() {
    await this.checkoutBtn.click();
  }

  async checkoutLogin(email: string, password: string) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginBtn.click();
  }

  async checkoutGuestAcct(email: string, firstName: string, lastName: string) {
    await this.guestEmailInput.fill(email);
    await this.guestFirstNameIput.fill(firstName);
    await this.guestLastNameInput.fill(lastName);
    await this.continueGuestBtn.click();
  }

  async getLoginConfirmationMsg() {
    return await this.loginConfirmation.textContent();
  }

  async clickSignInContinue() {
    await this.secondProceed.click();
  }

  getBillingAddessFormTitle() {
    return this.page.getByRole("heading", { name: "Billing Address" });
  }

  async enterBillingAddress(
    country: string,
    postalCode: string,
    houseNum: string,
    street: string,
    city: string,
    state: string,
  ) {
    await this.countryDropdown.selectOption(country);
    await this.postalCodeInput.fill(postalCode);
    await this.houserNumInput.fill(houseNum);
    await this.streetInput.fill(street);
    await this.cityInput.fill(city);
    await this.stateInput.fill(state);
  }

  getBillingAddressSubmitBtn() {
    return this.thirdProceedBtn;
  }

  async clickBillingAddressSubmitBtn() {
    await this.thirdProceedBtn.click();
  }

  async enterCreditCard(
    creditCardNum: string,
    expDate: string,
    cvv: string,
    name: string,
  ) {
    await this.paymentMethodDropdown.selectOption("Credit Card");
    await this.creditCardNumInput.fill(creditCardNum);
    await this.expDateInput.fill(expDate);
    await this.cvvInput.fill(cvv);
    await this.cardHolderNameInput.fill(name);
    await this.confirmBtn.click();
  }

  async getPaymentSuccessMsg() {
    return await this.paymentSuccessMsg.textContent();
  }
}
