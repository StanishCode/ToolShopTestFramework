import { Page } from "@playwright/test";

export async function setCart(
  page: Page,
  cartID: string,
  cartQuantity: string,
) {
  await page.addInitScript(
    ({ cartID, cartQuantity }) => {
      sessionStorage.setItem("cart_id", cartID);
      sessionStorage.setItem("cart_quantity", cartQuantity);
    },
    { cartID, cartQuantity },
  );
}
