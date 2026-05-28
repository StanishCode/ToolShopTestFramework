import { test, expect } from "../../fixtures";

//TODO: look into parameterization
test("user can only register with valid phone number", async ({
  registerPage,
}) => {
  await registerPage.gotoRegisterPage();

  //valid phone number using numbers
  await registerPage.enterPhoneNum("1234567890");
  await registerPage.clickRegisterBtn();
  await expect(registerPage.getPhoneErrorMsg()).toBeHidden();

  //invalid phone number using letters
  await registerPage.enterPhoneNum("abcdefghij");
  await registerPage.clickRegisterBtn();
  await expect(registerPage.getPhoneErrorMsg()).toBeVisible();
});
