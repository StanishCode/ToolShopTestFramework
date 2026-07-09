import { Page } from "@playwright/test";

export async function logoutUI(page: Page) {
  await page.addInitScript(() => {
    localStorage.removeItem("auth-token");
  });

  await page.reload();
}
