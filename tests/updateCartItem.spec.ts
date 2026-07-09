//TODO: Need to refactor test case to be CI compatible

// import { test } from "../fixtures";
// import { expect } from "@playwright/test";
// import { setCart } from "../utils/set-cart";

// test("Cart with only one item and increase item quantity by one", async ({
//   cartAPI,
//   productAPI,
//   cartCheckoutPage,
//   page,
// }) => {
//   const intitialQuantity = 1;
//   const updatedQuantity = intitialQuantity + 1;
//   const cart = await cartAPI.createNewCart();

//   //TODO: exception handling for api timeout
//   //search product and add to cart thru api
//   const productInfo: any =
//     await productAPI.getFirstProductInfo("Combination Pliers");
//   await cartAPI.addToCart(cart.id, {
//     product_id: productInfo.id,
//     quantity: intitialQuantity,
//   });

//   const { cartInfo, totalItems } = await cartAPI.getCart(cart.id);

//   //set cart session info
//   await setCart(page, cartInfo.id, totalItems.toString());

//   //wait for cart to load and display cart items
//   const [loadResponse] = await Promise.all([
//     page.waitForResponse(
//       (response) =>
//         response.url().includes("/carts/") &&
//         response.request().method() === "GET",
//     ),
//     cartCheckoutPage.goToCheckout(),
//   ]);
//   expect(loadResponse.ok()).toBeTruthy();
//   await expect(cartCheckoutPage.getCartItems()).toBeVisible();

//   //update cart item quantity then wait for api call to finish
//   const [updateResponse] = await Promise.all([
//     page.waitForResponse(
//       (response) =>
//         response.url().includes(`/carts/${cart.id}/product/quantity`) &&
//         response.request().method() === "PUT",
//     ),
//     cartCheckoutPage.setProductQuantities(0, updatedQuantity.toString()),
//   ]);
//   expect(updateResponse.ok()).toBeTruthy();

//   expect(await cartCheckoutPage.getProductQuantities(0)).toBe(
//     updatedQuantity.toString(),
//   );
//   await expect(cartCheckoutPage.getProductTotals(0)).toContainText(
//     (productInfo.price * updatedQuantity).toString(),
//   );

//   expect(await cartCheckoutPage.getBanner().textContent()).toContain(
//     "Product quantity updated.",
//   );

//   //the cart total price updates on the UI very slowly, waiting until banner
//   //is gone is enough time for update
//   await page.waitForSelector("#toast-container", { state: "hidden" });

//   await expect(cartCheckoutPage.getCartTotal()).toContainText(
//     (productInfo.price * updatedQuantity).toString(),
//   );
// });
