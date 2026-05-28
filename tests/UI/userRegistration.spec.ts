import { test, expect } from "../../fixtures";

test("User can register an account", async ({
  registerPage,
  page,
  userDataGen,
  userAPI,
  createdUsers,
}) => {
  const newUser = userDataGen.generateUser();

  await registerPage.gotoRegisterPage();

  await registerPage.submitRegistrationForm(newUser);

  await expect(page).toHaveURL(/auth\/login/);

  //registered user cleanup
  const response = await userAPI.getCurrentUser({
    email: newUser.email,
    password: newUser.password,
  });
  const data = await response.json();
  createdUsers.push(data.id);
});
