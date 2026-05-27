import { test } from "../../fixtures";
import { expect } from "@playwright/test";
import loginData from "../../data/validLoginData.json" with { type: "json" };

//TODO: login has account lock feature, need to dynamically create users
for (const data of loginData) {
  test.only(`User ${data.name} can login successfully with valid credentials`, async ({
    signinPage,
    page,
  }) => {
    await signinPage.goToSignInPage();
    await signinPage.signInAccount(data.email, data.password);

    await expect(page).toHaveURL("/account");
    await expect(signinPage.getLoginTab()).toContainText(data.name);
  });
}
