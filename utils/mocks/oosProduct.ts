import { Page } from "@playwright/test";

export async function oosProduct(page: Page, productId: string) {
  await page.route(`**/products/${productId}`, async (route) => {
    const response = await route.fetch();
    const body = await response.json();
    body.in_stock = 0;

    await route.fulfill({ response, body: JSON.stringify(body) });
  });
}
