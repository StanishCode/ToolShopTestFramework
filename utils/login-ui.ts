import { Page } from "@playwright/test";

export async function loginUI(page: Page, token: string, path: string) {
  await page.addInitScript((token) => {
    localStorage.setItem("auth-token", token);
  }, token);

  await page.goto(path);
}
