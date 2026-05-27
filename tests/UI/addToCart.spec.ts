import { test } from "../../fixtures";
import { expect } from "@playwright/test";

test.only("User can add available product to cart", async ({
  productAPI,
  productPage,
  cartCheckoutPage,
}) => {
  //api changes product id periodically so I need to search for id each test
  const keyword = "Combination Pliers";
  const searchResponse = await productAPI.searchProducts(keyword);
  const body = await searchResponse.json();

  expect(body.data.length).toBeGreaterThan(0);

  const product = body.data[0];

  expect(body.data.length).toBeGreaterThan(0);
  await productPage.goToPdp(product.id);

  await expect(productPage.getAddToCartButton()).toBeVisible();

  await productPage.clickAddToCartBtn();

  //validate successs alert displays and cart badge displays
  await expect(productPage.getBanner()).toContainText(
    "Product added to shopping cart.",
  );
  await expect(productPage.getCartBadge()).toContainText("1");

  await cartCheckoutPage.goToCheckout();

  //validate item exist in cart
  await expect(cartCheckoutPage.getCartItems()).toContainText(product.name);
});
