import { test } from "../fixtures";
import { expect } from "@playwright/test";
import { setCart } from "../utils/set-cart";

test("remove a single item from cart and cart only has one item", async ({
  cartAPI,
  productAPI,
  cartCheckoutPage,
  page,
}) => {
  const quantity = 1;
  const cart = await cartAPI.createNewCart();

  //TODO: exception handling for api timeout
  //search product and add to cart thru api
  const productInfo: any =
    await productAPI.getFirstProductInfo("Combination Pliers");
  await cartAPI.addToCart(cart.id, {
    product_id: productInfo.id,
    quantity: quantity,
  });

  const { cartInfo, totalItems } = await cartAPI.getCart(cart.id);

  //set cart session info
  await setCart(page, cartInfo.id, totalItems.toString());

  //wait for cart to load and display cart items
  await Promise.all([
    page.waitForResponse(
      (response) =>
        response.url().includes("/carts/") &&
        response.request().method() === "GET" &&
        response.status() == 200,
    ),
    cartCheckoutPage.goToCheckout(),
  ]);
  await expect(cartCheckoutPage.getCartItems()).toBeVisible();

  //remove cart item then wait for api call to finish
  const responsePromise = page.waitForResponse(
    (response) =>
      response.url().includes(`/carts/${cart.id}`) &&
      response.request().method() === "GET",
  );

  await cartCheckoutPage.removeProduct(0);

  await responsePromise;

  expect(await cartCheckoutPage.getBanner().textContent()).toContain(
    "Product deleted.",
  );
  await expect(cartCheckoutPage.getCartItems()).toBeHidden();
  expect(await cartCheckoutPage.isEmptyCartMessageDisplayed()).toBeTruthy();
});
