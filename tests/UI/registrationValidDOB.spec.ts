import { test, expect } from "../../fixtures";

//TODO: look into parameterization
test("user can register with a valid DoB", async ({ registerPage }) => {
  await registerPage.gotoRegisterPage();

  //valid DoB format
  await registerPage.enterDOB("2008-05-18");

  //date frontend validation triggers after failed form submission
  await registerPage.clickRegisterBtn();
  await expect(registerPage.getDOBErrorMsg()).toBeHidden();
});
