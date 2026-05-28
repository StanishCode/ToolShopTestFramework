import { test, expect } from "../../fixtures";

test("user must have at least one special character in password to register", async ({
  registerPage,
}) => {
  await registerPage.gotoRegisterPage();

  await registerPage.enterPassword("abcdefg!");
  await expect(registerPage.getPasswordHelpListItems().nth(3)).toContainClass(
    "text-success",
  );

  await registerPage.enterPassword("abcdef!@");
  await expect(registerPage.getPasswordHelpListItems().nth(3)).toContainClass(
    "text-success",
  );

  await registerPage.enterPassword("abcdefgh");
  await expect(
    registerPage.getPasswordHelpListItems().nth(3),
  ).not.toContainClass("text-success");
});
