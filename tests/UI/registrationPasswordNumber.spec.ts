import { test, expect } from "../../fixtures";

test("user must have at least one number in password to register", async ({
  registerPage,
}) => {
  await registerPage.gotoRegisterPage();

  await registerPage.enterPassword("abcdefg1");
  await expect(registerPage.getPasswordHelpListItems().nth(2)).toContainClass(
    "text-success",
  );

  await registerPage.enterPassword("abcdef12");
  await expect(registerPage.getPasswordHelpListItems().nth(2)).toContainClass(
    "text-success",
  );

  await registerPage.enterPassword("abcdefgh");
  await expect(
    registerPage.getPasswordHelpListItems().nth(2),
  ).not.toContainClass("text-success");
});
