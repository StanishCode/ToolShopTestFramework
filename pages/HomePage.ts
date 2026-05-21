import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly signinBtn: Locator;
  readonly searchBar: Locator;
  readonly searchBtn: Locator;
  readonly categoryCheckboxes: Locator;
  readonly brandCheckboxes: Locator;
  readonly sustainabilityCheckbox: Locator;
  readonly userNav: Locator;

  constructor(private page: Page) {
    this.signinBtn = this.page.locator("a[data-test='nav-sign-in']");
    this.searchBar = this.page.locator("input[data-test='search-query']");
    this.searchBtn = this.page.locator("button[data-test='search-submit']");
    this.categoryCheckboxes = this.page.locator("input[name='category_id']");
    this.brandCheckboxes = this.page.locator("input[name='brand_id']");
    this.sustainabilityCheckbox = this.page.locator(
      "input[data-test='eco-friendly-filter']",
    );
    this.userNav = this.page.locator("button[data-test='nav-menu']");
  }

  async goToHomePage() {
    await this.page.goto("/", { waitUntil: "domcontentloaded" });
  }

  async goToSigninPage() {
    await this.signinBtn.click();
  }

  async goToCart() {
    await this.page.locator("a[data-test='nav-cart']").click();
  }

  async getAllProductsInfo() {
    const products = await this.page
      .locator("a[data-test^='product-']")
      .allTextContents();
    return products;
  }

  async getFirstProductInfo() {
    const product = this.page.locator("a[data-test^='product-']");
    const productName = await product
      .first()
      .locator("h5[data-test='product-name']")
      .textContent();
    const productPrice = await product
      .first()
      .locator("span[data-test='product-price']")
      .textContent();
    const productAvailability = product.locator(
      "span[data-test='out-of-stock']",
    );

    return { productName, productPrice, productAvailability };
  }

  getFirstProduct() {
    return this.page.locator("a[data-test^='product-']").first();
  }

  async selectFirstProduct() {
    const product = this.page.locator("a[data-test^='product-']");
    await product.first().click();
  }

  async selectProduct(name: string) {
    const product = this.page.locator("a[data-test^='product-']", {
      hasText: name,
    });
    await product.click();
  }

  async getProductInfo(name: string) {
    const product = this.page.locator("a[data-test^='product-']", {
      hasText: name,
    });
    const productName = await product
      .locator("h5[data-test='product-name']")
      .textContent();
    const productPrice = await product
      .locator("span[data-test='product-price']")
      .textContent();
    const productAvailability = product.locator(
      "span[data-test='out-of-stock']",
    );

    return { productName, productPrice, productAvailability };
  }

  getAccountTab() {
    return this.userNav;
  }

  async searchProduct(keyword: string) {
    await this.searchBar.fill(keyword);
    await this.searchBtn.click();
  }

  getSearchCount() {
    return this.page.locator("p[data-testid='search-result-count']");
  }

  getNoResultsMsg() {
    return this.page.getByText("There are no products found.");
  }

  getCartBadge() {
    return this.page.locator("span[data-test='cart-quantity']");
  }
}
