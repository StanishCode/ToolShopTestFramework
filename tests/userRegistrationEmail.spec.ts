import { test } from "../fixtures";
import { expect } from "@playwright/test";

//TODO: look into parameterization
test("Email frontend validation: email address must be valid", async ({
  registerPage,
}) => {
  await registerPage.gotoRegisterPage();

  //valid emails with "@" and domain
  await registerPage.enterEmail("email@.com");
  await registerPage.clickRegisterBtn();
  await expect(registerPage.getEmailErrorMsg()).toBeHidden();

  await registerPage.enterEmail("email@.net");
  await registerPage.clickRegisterBtn();
  await expect(registerPage.getEmailErrorMsg()).toBeHidden();

  await registerPage.enterEmail("email@.org");
  await registerPage.clickRegisterBtn();
  await expect(registerPage.getEmailErrorMsg()).toBeHidden();

  await registerPage.enterEmail("email@.edu");
  await registerPage.clickRegisterBtn();
  await expect(registerPage.getEmailErrorMsg()).toBeHidden();

  await registerPage.enterEmail("email.com");
  await registerPage.clickRegisterBtn();
  await expect(registerPage.getEmailErrorMsg()).toBeVisible();

  //invalid email without domain
  await registerPage.enterEmail("email@");
  await registerPage.clickRegisterBtn();
  await expect(registerPage.getEmailErrorMsg()).toBeVisible();
});
