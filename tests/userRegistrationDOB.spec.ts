import { test } from "../fixtures";
import { expect } from "@playwright/test";

//TODO: look into parameterization
test("DoB frontend validation:valid date format YYYY-MM-DD", async ({
  registerPage,
}) => {
  await registerPage.gotoRegisterPage();

  //date frontend validation triggers after failed form submission
  await registerPage.clickRegisterBtn();

  //invalid DoB format
  await registerPage.enterDOB("05/18/2008");
  await expect(registerPage.getDOBErrorMsg()).toBeVisible();

  //valid DoB format
  await registerPage.enterDOB("2008-05-18");
  await expect(registerPage.getDOBErrorMsg()).toBeHidden();
});
