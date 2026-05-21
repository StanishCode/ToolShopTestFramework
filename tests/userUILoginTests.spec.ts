import { test } from "../fixtures";
import { expect } from "@playwright/test";
import loginData from "../data/loginData.json" with { type: "json" };

//TODO: login has account lock feature, need to dynamically create users
for (const data of loginData) {
  test(`User login with ${data.test}`, async ({
    homePage,
    signinPage,
    page,
  }) => {
    await homePage.goToHomePage();
    await homePage.goToSigninPage();

    await signinPage.signInAccount(data.email, data.password);

    if (data.role === "user" && data.validity === "valid") {
      expect(page.url().includes("/account"));
      await expect(signinPage.getLoginTab()).toContainText(data.name);
    }
    if (data.role === "admin" && data.validity === "valid") {
      expect(page.url().includes("/admin/dashboard"));
      await expect(signinPage.getLoginTab()).toContainText(data.name);
    }
    if (data.validity === "invalid") {
      await expect(signinPage.getErrorMsg()).toContainText(
        "Invalid email or password",
      );
    }
  });
}
