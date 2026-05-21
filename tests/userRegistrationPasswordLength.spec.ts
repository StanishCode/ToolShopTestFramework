import { test } from "../fixtures";
import { expect } from "@playwright/test";

test("Password frontend validation: password must be at least 8 characters and no more than 40 characters", async ({
  registerPage,
}) => {
  await registerPage.gotoRegisterPage();

  //password with 8 characters
  await registerPage.enterPassword("abcdefgh");
  expect(registerPage.getPasswordHelpListItems().first()).toContainClass(
    "text-success",
  );

  //password with 9 characters
  await registerPage.enterPassword("abcdefghi");
  expect(registerPage.getPasswordHelpListItems().first()).toContainClass(
    "text-success",
  );

  //password with 7 characters
  await registerPage.enterPassword("abcdefg");
  expect(registerPage.getPasswordHelpListItems().first()).not.toContainClass(
    "text-success",
  );
});
