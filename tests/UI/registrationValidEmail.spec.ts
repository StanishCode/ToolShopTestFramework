import { test, expect } from "../../fixtures";

//TODO: look into parameterization
test("user can register with a valid email", async ({ registerPage }) => {
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
});
