import { Page, expect, Locator } from "@playwright/test";

//TODO: need to add advanced action methods and necessary locators
export class ProductPage {
  private readonly page: Page;
  private readonly productName: Locator;
  private readonly category: Locator;
  private readonly brand: Locator;
  private readonly description: Locator;
  private readonly decrease: Locator;
  private readonly quantity: Locator;
  private readonly increase: Locator;
  private readonly addToCart: Locator;
  private readonly addToFavorites: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('[data-test="product-name"]');
    this.category = page.locator('[aria-label="category"]');
    this.brand = page.locator('[aria-label="brand"]');
    this.description = page.locator("#description");
    this.decrease = page.locator("#btn-decrease-quantity");
    this.quantity = page.locator("#quantity-input");
    this.increase = page.locator("#btn-increase-quantity");
    this.addToCart = page.locator("#btn-add-to-cart");
    this.addToFavorites = page.locator("#btn-add-to-favorites");
  }

  async getProductName(): Promise<string> {
    return this.productName.innerText();
  }

  async getProductCategory(): Promise<string> {
    return this.category.innerText();
  }

  async getProductBrand(): Promise<string> {
    return this.brand.innerText();
  }

  async getProdutDescription(): Promise<string> {
    return this.description.innerText();
  }

  async clickQuantityDecrease() {
    await this.decrease.click();
  }

  async getProductQuantity(): Promise<string> {
    return this.quantity.inputValue();
  }

  async clickQuantityIncrease() {
    await this.increase.click();
  }

  async clickAddToCart() {
    await this.addToCart.click();
  }

  async clickAddToFavorites() {
    await this.addToFavorites.click();
  }
}
