import { test } from "../fixtures";
import { expect } from "@playwright/test";

test("Password frontend validation: password inlcudes at least one special character", async ({
  registerPage,
}) => {
  await registerPage.gotoRegisterPage();

  await registerPage.enterPassword("abcdefg!");
  expect(registerPage.getPasswordHelpListItems().nth(3)).toContainClass(
    "text-success",
  );

  await registerPage.enterPassword("abcdef!@");
  expect(registerPage.getPasswordHelpListItems().nth(3)).toContainClass(
    "text-success",
  );

  await registerPage.enterPassword("abcdefgh");
  expect(registerPage.getPasswordHelpListItems().nth(3)).not.toContainClass(
    "text-success",
  );
});
