import { test } from "../fixtures";
import { expect } from "@playwright/test";

test("User submits registration form with valid data to created account", async ({
  registerPage,
  signinPage,
  page,
  userDataGen,
  userAPI,
  createdUsers,
}) => {
  const newUser = userDataGen.generateUIUser();

  await registerPage.gotoRegisterPage();

  await registerPage.submitRegistrationForm(newUser);

  await expect(page).toHaveURL(/auth\/login/);

  await signinPage.signInAccount(newUser.email, newUser.password);
  await expect(page).toHaveURL(/account/);

  const response = await userAPI.getCurrentUser({
    email: newUser.email,
    password: newUser.password,
  });
  const data = await response.json();
  createdUsers.push(data.id);
});
