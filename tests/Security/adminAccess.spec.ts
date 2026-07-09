import { test, expect } from "../../fixtures";
import { loginUI } from "../../utils/login-ui";

test("users cannot access admin page", async ({
  userAPI,
  userDataGen,
  createdUsers,
  page,
}) => {
  //create new user
  const newUser = userDataGen.generateUser();
  const response = await userAPI.createUser(newUser);
  expect(response.status()).toBe(201);

  const { id } = await response.json();
  createdUsers.push(id);

  const { access_token, statusCode } = await userAPI.loginUser({
    email: newUser.email,
    password: newUser.password,
  });
  expect(statusCode).toBe(200);
  createdUsers.push();
  //login to UI
  await loginUI(page, access_token, "/admin/dashboard");
  //attempt access to admin dashboard
  await expect(page).toHaveURL(
    "https://practicesoftwaretesting.com/auth/login",
  );
});
