// import { test, expect } from "../fixtures";
// import { loginUI } from "../utils/login-ui";
// import { setCart } from "../utils/set-cart";

// test("user can checkout their cart", async ({
//   userAPI,
//   productAPI,
//   cartAPI,
//   userDataGen,
//   createdUsers,
//   page,
//   homePage,
//   cartCheckoutPage,
// }) => {
//   //Generate and create user thru api
//   const newUser = userDataGen.generateUser();
//   const createResponse = await userAPI.createUser(newUser);

//   //add user id to user array
//   const { id } = await createResponse.json();
//   createdUsers.push(id);

//   //login user thru api
//   const loginResponse = await userAPI.loginUser({
//     email: newUser.email,
//     password: newUser.password,
//   });

//   //create new cart thru api
//   const cart = await cartAPI.createNewCart();

//   //TODO: exception handling for api timeout
//   //search product and add to cart thru api
//   const productInfo: any =
//     await productAPI.getFirstProductInfo("Combination Pliers");
//   await cartAPI.addToCart(cart.id, {
//     product_id: productInfo.id,
//     quantity: 1,
//   });

//   const { cartInfo, totalItems } = await cartAPI.getCart(cart.id);

//   //set cart session info
//   await setCart(page, cartInfo.id, totalItems.toString());

//   //inject authentication in browser and access account thru UI
//   await loginUI(page, loginResponse.access_token, "/");

//   await expect(homePage.getAccountTab()).toContainText(
//     `${newUser.first_name} ${newUser.last_name}`,
//   );

//   //wait for cart to load and display cart items
//   const responsePromise = page.waitForResponse(
//     (response) =>
//       response.url().includes("/carts/") &&
//       response.request().method() === "GET",
//   );

//   await cartCheckoutPage.goToCheckout();

//   await responsePromise;

//   await expect(cartCheckoutPage.getCartItems()).toBeVisible();

//   //retrieve cart item name and current quantity
//   const cartItemName = await cartCheckoutPage.getProductTitle(0);
//   const cartItemQuantity = await cartCheckoutPage.getProductQuantities(0);

//   expect(cartItemName).toContain(productInfo.name);
//   expect(cartItemQuantity).toBe("1");

//   //go thru sign in page while already signed into account
//   await cartCheckoutPage.clickCheckoutBtn();
//   await cartCheckoutPage.clickSignInContinueBtn();

//   //wait for billing address form to display and fill out form
//   await expect(cartCheckoutPage.getBillingAddessFormTitle()).toBeVisible({
//     timeout: 10000,
//   });
//   await cartCheckoutPage.enterBillingAddress(
//     newUser.address.country,
//     newUser.address.postal_code,
//     "42",
//     newUser.address.street,
//     newUser.address.city,
//     newUser.address.state,
//   );
//   //synchronization issues with form not being enabled
//   //seperated the submit button click to wait for it to be enabled
//   await expect(cartCheckoutPage.getBillingAddressSubmitBtn()).toBeEnabled({
//     timeout: 15000,
//   });
//   await cartCheckoutPage.clickBillingAddressSubmitBtn();

//   //TODO: should wait for credit card form to load
//   //wait for credit card form to load and fill out
//   await cartCheckoutPage.enterCreditCard(
//     "1234-5678-9101-1121",
//     "03/2030",
//     "123",
//     "John Smith",
//   );

//   //validate payment success message is displayed and checkout process is complete
//   expect(await cartCheckoutPage.getPaymentSuccessMsg()).toBe(
//     "Payment was successful",
//   );
// });
