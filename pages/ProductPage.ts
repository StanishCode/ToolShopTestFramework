import { Page, Locator } from "@playwright/test";

export class ProductPage {
  readonly productName: Locator;
  readonly productImg: Locator;
  readonly category: Locator;
  readonly brand: Locator;
  readonly co2Rating: Locator;
  readonly unitPrice: Locator;
  readonly productDescription: Locator;
  readonly productQuantity: Locator;
  readonly outOfStockMsg: Locator;
  readonly addToCartBtn: Locator;
  readonly favoritesBtn: Locator;
  readonly compareBtn: Locator;

  constructor(private page: Page) {
    this.productName = this.page.locator("h1[data-test='product-name']");
    this.productImg = this.page.locator("img.figure-img");
    this.category = this.page.locator("span[aria-label='category']");
    this.brand = this.page.locator("span[aria-label='brand']");
    this.co2Rating = this.page.locator("span.co2-letter.active");
    this.unitPrice = this.page.locator("span[data-test='unit-price']");
    this.productDescription = this.page.locator(
      "p[data-test='product-description']",
    );
    this.productQuantity = this.page.locator("input[data-test='quantity']");
    this.outOfStockMsg = this.page.locator("p[data-test='out-of-stock']");
    this.addToCartBtn = this.page.locator("button[data-test='add-to-cart']");
    this.favoritesBtn = this.page.locator(
      "button[data-test='add-to-favorites']",
    );
    this.compareBtn = this.page.locator("button[data-test='add-to-compare']");
  }

  async goToPdp(productID: string) {
    await this.page.goto(`/product/${productID}`, {
      waitUntil: "domcontentloaded",
    });
  }

  getProductName() {
    return this.productName;
  }

  async getProductInfo() {
    const name = await this.productName.textContent();
    const price = await this.unitPrice.textContent();
    const description = await this.productDescription.textContent();
    const quantity = await this.productQuantity.inputValue();
    const img = await this.productImg.getAttribute("src");
    const co2Rating = await this.co2Rating.textContent();

    return { name, price, description, quantity, img, co2Rating };
  }

  async isProductOutOfStock() {
    return await this.outOfStockMsg.isVisible();
  }

  async isCartBtnEnabled() {
    return await this.addToCartBtn.isEnabled();
  }

  async clickAddToCartBtn() {
    await this.addToCartBtn.click();
  }

  getBanner() {
    return this.page.locator(".toast-message");
  }
}
