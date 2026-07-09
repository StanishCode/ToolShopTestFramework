//TODO: Need to refactor test case to be CI compatible

// import { test } from "../fixtures";
// import { expect } from "@playwright/test";
// import { setCart } from "../utils/set-cart";

// test("set cart item with non-zero quantity to zero and cart only has one item", async ({
//   cartAPI,
//   productAPI,
//   cartCheckoutPage,
//   page,
// }) => {
//   const intitialQuantity = 1;
//   const updatedQuantity = 0;

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
//   const [response] = await Promise.all([
//     page.waitForResponse(
//       (response) =>
//         response.url().includes("/carts/") &&
//         response.request().method() === "GET",
//     ),
//     cartCheckoutPage.goToCheckout(),
//   ]);
//   expect(response.ok()).toBeTruthy();
//   await expect(cartCheckoutPage.getCartItems()).toBeVisible();

//   //update cart item quantity then wait for api call to finish

//   await cartCheckoutPage.setProductQuantities(0, updatedQuantity.toString());

//   expect(await cartCheckoutPage.getProductQuantities(0)).toBe("1");
//   await expect(cartCheckoutPage.getProductTotals(0)).toContainText(
//     productInfo.price.toString(),
//   );
//   await expect(cartCheckoutPage.getCartTotal()).toContainText(
//     productInfo.price.toString(),
//   );
//   expect(await cartCheckoutPage.getBanner().textContent()).toContain(
//     "Product quantity updated.",
//   );
// });
