import { Page, expect, Locator } from "@playwright/test";

//TODO: need to add advanced action methods and necessary locators
export class AccountPage {
  private readonly page: Page;
  private readonly favorites: Locator;
  private readonly profile: Locator;
  private readonly invoices: Locator;
  private readonly messages: Locator;

  constructor(page: Page) {
    this.page = page;
    this.favorites = page.getByRole("button", { name: "Favorites" });
    this.profile = page.getByRole("button", { name: "Profile" });
    this.invoices = page.getByRole("button", { name: "Inovices" });
    this.messages = page.getByRole("button", { name: "Messages" });
  }

  async clickFavorites() {
    await this.favorites.click();
  }

  async clickProfile() {
    await this.profile.click();
  }

  async clickInvoices() {
    await this.invoices.click();
  }

  async clickMessages() {
    await this.messages.click();
  }
}
