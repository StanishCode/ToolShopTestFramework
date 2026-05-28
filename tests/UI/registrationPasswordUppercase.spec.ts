import { test, expect } from "../../fixtures";

test("user can only register if password contains both uppercase and lowercase letters", async ({
  registerPage,
}) => {
  await registerPage.gotoRegisterPage();

  await registerPage.enterPassword("Abcdefgh");
  await expect(registerPage.getPasswordHelpListItems().nth(1)).toContainClass(
    "text-success",
  );

  await registerPage.enterPassword("ABcdefghi");
  await expect(registerPage.getPasswordHelpListItems().nth(1)).toContainClass(
    "text-success",
  );

  await registerPage.enterPassword("abcdefg");
  await expect(
    registerPage.getPasswordHelpListItems().nth(1),
  ).not.toContainClass("text-success");
});
