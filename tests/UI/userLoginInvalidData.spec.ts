import { test, expect } from "../../fixtures";
import loginData from "../../data/invalidLoginData.json" with { type: "json" };

//TODO: login has account lock feature, need to dynamically create users
for (const data of loginData) {
  test(`User ${data.name} cannot login successfully with invalid credentials`, async ({
    signinPage,
  }) => {
    await signinPage.goToSignInPage();
    await signinPage.signInAccount(data.email, data.password);

    await expect(signinPage.getErrorMsg()).toContainText(
      "Invalid email or password",
    );
  });
}
