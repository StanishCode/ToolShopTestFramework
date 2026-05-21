import { test } from "../fixtures";
import { expect } from "@playwright/test";

test("Password frontend validation: password contains both uppercase and lowercase letters", async ({
  registerPage,
}) => {
  await registerPage.gotoRegisterPage();

  await registerPage.enterPassword("Abcdefgh");
  expect(registerPage.getPasswordHelpListItems().nth(1)).toContainClass(
    "text-success",
  );

  await registerPage.enterPassword("ABcdefghi");
  expect(registerPage.getPasswordHelpListItems().nth(1)).toContainClass(
    "text-success",
  );

  await registerPage.enterPassword("abcdefg");
  expect(registerPage.getPasswordHelpListItems().nth(1)).not.toContainClass(
    "text-success",
  );
});
