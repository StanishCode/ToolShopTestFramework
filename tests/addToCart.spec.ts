import { test } from "../fixtures";
import { expect } from "@playwright/test";

test("Add one available product to cart successfully", async ({
  productAPI,
  productPage,
  homePage,
  cartCheckoutPage,
  page,
}) => {
  const keyword = "Combination Pliers";

  //Get product via API
  const productInfo = await productAPI.getFirstProductInfo(keyword);

  await productPage.goToPdp(productInfo.id);

  const pdpInfo = await productPage.getProductInfo();

  const cartResponse = page.waitForResponse(
    (res) =>
      res.url().includes("/carts") &&
      res.request().method() === "POST" &&
      res.ok(),
  );

  //Trigger cart creation and add-to-cart
  await productPage.clickAddToCartBtn();
  await cartResponse;

  //Validate banner message
  await expect(productPage.getBanner()).toBeVisible({ timeout: 10000 });
  await expect(productPage.getBanner()).toContainText(
    "Product added to shopping cart.",
  );

  //Validate cart badge update
  await expect(homePage.getCartBadge()).toHaveText(String(pdpInfo.quantity));

  await homePage.goToCart();

  const cartItems = cartCheckoutPage.getCartItems();
  await expect(cartItems).toBeVisible({ timeout: 15000 });

  const cartText = await cartItems.textContent();

  expect(cartText).toContain(productInfo.name);
  expect(cartText).toContain(productInfo.price.toString());

  await expect(cartCheckoutPage.getCartTotal()).toContainText(
    (productInfo.price * Number(pdpInfo.quantity)).toString(),
    { timeout: 15000 },
  );

  expect(await cartCheckoutPage.getProductQuantities(0)).toBe(pdpInfo.quantity);
});
