import { test, expect } from "../../fixtures";
import { loginUI } from "../../utils/login-ui";
import { setCart } from "../../utils/set-cart";

test("User can checkout cart", async ({
  userAPI,
  productAPI,
  cartAPI,
  userDataGen,
  createdUsers,
  page,
  cartCheckoutPage,
}) => {
  //generate user and then register thru api
  const newUser = userDataGen.generateUser();
  const createResponse = await userAPI.createUser(newUser);

  expect(createResponse.ok()).toBeTruthy();

  //push user id into cleanup array
  const { id } = await createResponse.json();
  createdUsers.push(id);

  const loginResponse = await userAPI.loginUser({
    email: newUser.email,
    password: newUser.password,
  });
  const cart = await cartAPI.createNewCart();
  const productInfo =
    await productAPI.getFirstProductInfo("Combination Pliers");

  await cartAPI.addToCart(cart.id, {
    product_id: productInfo.id,
    quantity: 1,
  });

  const { cartInfo, totalItems } = await cartAPI.getCart(cart.id);

  //set session cart info then login thru UI
  await setCart(page, cartInfo.id, totalItems.toString());
  await loginUI(page, loginResponse.access_token, "/");

  await cartCheckoutPage.goToCheckout();

  await expect(page).toHaveURL(/checkout/);
  await expect(cartCheckoutPage.getCheckoutBtn()).toBeVisible();

  await cartCheckoutPage.clickCheckoutBtn();
  await cartCheckoutPage.clickSignInContinueBtn();

  await expect(cartCheckoutPage.getBillingAddessFormTitle()).toBeVisible();
});
