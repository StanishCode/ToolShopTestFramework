import { test, expect } from "../../fixtures";

test("user cannot register with an invalid email", async ({ registerPage }) => {
  //invalid email without "@"
  await registerPage.enterEmail("email.com");
  await registerPage.clickRegisterBtn();
  await expect(registerPage.getEmailErrorMsg()).toBeVisible();

  //invalid email without domain
  await registerPage.enterEmail("email@");
  await registerPage.clickRegisterBtn();
  await expect(registerPage.getEmailErrorMsg()).toBeVisible();
});
