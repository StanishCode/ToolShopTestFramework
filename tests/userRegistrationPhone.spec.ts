import { test } from "../fixtures";
import { expect } from "@playwright/test";

//TODO: look into parameterization
test("Phone frontend validation: only numbers are allowed", async ({
  registerPage,
}) => {
  await registerPage.gotoRegisterPage();

  //valid phone number using numbers
  await registerPage.enterPhoneNum("1234567890");
  await registerPage.clickRegisterBtn();
  expect(registerPage.getPhoneErrorMsg()).toBeHidden();

  //invalid phone number using letters
  await registerPage.enterPhoneNum("abcdefghij");
  await registerPage.clickRegisterBtn();
  expect(registerPage.getPhoneErrorMsg()).toBeVisible();
});
