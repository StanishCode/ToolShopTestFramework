import { test, expect } from "../../fixtures";

test("password must be at least 8 characters to register", async ({
  registerPage,
}) => {
  await registerPage.gotoRegisterPage();

  //password with 8 characters
  await registerPage.enterPassword("abcdefgh");
  await expect(registerPage.getPasswordHelpListItems().first()).toContainClass(
    "text-success",
  );

  //password with 9 characters
  await registerPage.enterPassword("abcdefghi");
  await expect(registerPage.getPasswordHelpListItems().first()).toContainClass(
    "text-success",
  );

  //password with 7 characters
  await registerPage.enterPassword("abcdefg");
  await expect(
    registerPage.getPasswordHelpListItems().first(),
  ).not.toContainClass("text-success");
});
