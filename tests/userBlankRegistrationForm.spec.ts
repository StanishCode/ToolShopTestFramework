import { test } from "../fixtures";
import { expect } from "@playwright/test";

test("User submits registration form with valid data", async ({
  registerPage,
}) => {
  await registerPage.gotoRegisterPage();

  //Submit form without entering any data
  await registerPage.clickRegisterBtn();

  await expect(registerPage.getFirstNameErrorMsg()).toBeVisible();
  await expect(registerPage.getLastNameErrorMsg()).toBeVisible();
  await expect(registerPage.getDOBErrorMsg()).toBeVisible();
  await expect(registerPage.getCountryErrorMsg()).toBeVisible();
  await expect(registerPage.getPostalCodeErrorMsg()).toBeVisible();
  await expect(registerPage.getHouseNumErrorMsg()).toBeVisible();
  await expect(registerPage.getStreetErrorMsg()).toBeVisible();
  await expect(registerPage.getCityErrorMsg()).toBeVisible();
  await expect(registerPage.getStateErrorMsg()).toBeVisible();
  await expect(registerPage.getPhoneErrorMsg()).toBeVisible();
  await expect(registerPage.getEmailErrorMsg()).toBeVisible();
  await expect(registerPage.getPasswordErrorMsg()).toBeVisible();
});
