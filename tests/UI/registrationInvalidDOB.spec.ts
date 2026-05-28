import { test, expect } from "../../fixtures";

test("user cannot register with an invalid DoB", async ({ registerPage }) => {
  await registerPage.gotoRegisterPage();

  //invalid DoB format
  await registerPage.enterDOB("05/18/2008");

  //date frontend validation triggers after failed form submission
  await registerPage.clickRegisterBtn();
  await expect(registerPage.getDOBErrorMsg()).toBeVisible();
});
