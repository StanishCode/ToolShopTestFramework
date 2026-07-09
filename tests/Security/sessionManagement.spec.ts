import { test, expect } from "../../fixtures";
import { loginUI } from "../../utils/login-ui";
import { logoutUI } from "../../utils/logout-ui";

test("user cannot access session after token expiration", async ({
  userAPI,
  userDataGen,
  createdUsers,
  page,
  homePage,
  signinPage,
}) => {
  const newUser = userDataGen.generateUser();
  const response = await userAPI.createUser(newUser);
  const { id } = await response.json();
  createdUsers.push(id);
  const loginResponse = await userAPI.loginUser({
    email: newUser.email,
    password: newUser.password,
  });

  expect(loginResponse.statusCode).toBe(200);

  //login to UI and then logout of account
  await loginUI(page, loginResponse.access_token, "/account");
  await expect(page).toHaveURL("https://practicesoftwaretesting.com/account");

  await expect(homePage.getAccountTab()).toBeVisible();
  await homePage.clickAccountTab();
  await homePage.clickSignOut();

  //need to remove auth token manually despite signing out
  await logoutUI(page);

  await expect(signinPage.getSignupHeading()).toBeVisible();

  await page.goto("/account");
  await expect(signinPage.getSignupHeading()).toBeVisible();
  await expect(page).toHaveURL(
    "https://practicesoftwaretesting.com/auth/login",
  );
});
