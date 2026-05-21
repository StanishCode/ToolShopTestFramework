import { test } from "../fixtures";
import { expect } from "@playwright/test";

test("Password frontend validation: password inlcudes at least one number", async ({
  registerPage,
}) => {
  await registerPage.gotoRegisterPage();

  await registerPage.enterPassword("abcdefg1");
  expect(registerPage.getPasswordHelpListItems().nth(2)).toContainClass(
    "text-success",
  );

  await registerPage.enterPassword("abcdef12");
  expect(registerPage.getPasswordHelpListItems().nth(2)).toContainClass(
    "text-success",
  );

  await registerPage.enterPassword("abcdefgh");
  expect(registerPage.getPasswordHelpListItems().nth(2)).not.toContainClass(
    "text-success",
  );
});
