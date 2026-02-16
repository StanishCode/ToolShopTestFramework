import { Page, expect, Locator } from "@playwright/test";

//TODO: need to add advanced action methods and necessary locators
export class ContactPage {
  private readonly page: Page;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly email: Locator;
  private readonly subject: Locator;
  private readonly message: Locator;
  private readonly attachment: Locator;
  private readonly send: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator("#first_name");
    this.lastName = page.locator("#last_name");
    this.email = page.locator("#email");
    this.subject = page.locator("#subject");
    this.message = page.locator("#message");
    this.attachment = page.locator("#attachment");
    this.send = page.locator('data-test="contact-submit"');
  }

  async enterFirstName(name: string) {
    await this.firstName.fill(name);
  }

  async enterLastName(name: string) {
    await this.lastName.fill(name);
  }

  async enterEmail(email: string) {
    await this.email.fill(email);
  }

  async getAllSubjects(): Promise<string[]> {
    return this.subject.locator("option").allInnerTexts();
  }

  async selectSubject(option: string) {
    await this.subject.selectOption(option);
  }

  async enterMessage(message: string) {
    await this.message.fill(message);
  }

  async uploadAttachment(file: string) {
    await this.attachment.setInputFiles("files/test.txt");
  }

  async clickSend() {
    await this.send.click();
  }
}
