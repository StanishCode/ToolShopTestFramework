import { Page, expect, Locator } from "@playwright/test";

//TODO: need to add advanced action methods and necessary locators
export class Homepage {
  private readonly page: Page;
  private readonly signin: Locator;
  private readonly categories: Locator;
  private readonly categoryOptions: Locator;
  private readonly search: Locator;
  private readonly sort: Locator;
  private readonly sortOptions: Locator;
  private readonly products: Locator;
  private readonly previous: Locator;
  private readonly next: Locator;
  private readonly categoryCheckboxes: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signin = page.getByRole("link", { name: "Sign in" });
    this.categories = page.getByRole("link", { name: "Categories" });
    this.categoryOptions = page.locator('[aria-label="nav-categories"] li a');
    this.search = page.locator("#search-query");
    this.sort = page.locator('[data-test="sort"]');
    this.sortOptions = this.sort.locator("option");
    this.products = page.locator(".card");
    this.previous = page.locator('[aria-label="Previous"]');
    this.next = page.locator('[aria-label="Next"]');
    this.categoryCheckboxes = page.locator(".checkbox");
  }

  async clickSignIn() {
    await this.signin.click();
  }

  async getAllCategories(): Promise<string[]> {
    return this.categoryOptions.allInnerTexts();
  }

  async selectCategory(category: string) {
    await this.categories.click();
    await this.categoryOptions.getByText(category).click();
  }

  async searchProduct(product: string) {
    await this.search.fill(product);
  }

  async getAllSortOptions(): Promise<string[]> {
    return this.sortOptions.allInnerTexts();
  }

  async sortProducts(sortOption: string) {
    await this.sort.selectOption(sortOption);
  }

  async getallProducts(): Promise<string[]> {
    return this.products.locator("h5").allInnerTexts();
  }

  async clickProduct(product: string) {
    await this.products.getByText(product).click();
  }

  async clickPrevious() {
    await this.previous.click();
  }

  async clickNext() {
    await this.next.click();
  }

  async checkHandTools() {
    await this.categoryCheckboxes.getByText("Hand Tools").check();
  }
}
