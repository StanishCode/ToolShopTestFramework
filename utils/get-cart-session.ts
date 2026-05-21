import { Page } from "@playwright/test";

export async function getSessionCartInfo(page: Page) {
  const cartID = await page.evaluate(() => sessionStorage.getItem("cart_id"));
  const cartQuantity = await page.evaluate(() =>
    sessionStorage.getItem("cart_quantity"),
  );

  return { cartID, cartQuantity };
}
