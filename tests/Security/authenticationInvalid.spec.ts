import { test, expect } from "../../fixtures";

test("user is not authenticated with invalid login", async ({
  userAPI,
  userDataGen,
  createdUsers,
}) => {
  const newUser = userDataGen.generateUser();
  const response = await userAPI.createUser(newUser);
  expect(response.status()).toBe(201);
  const { id } = await response.json();

  createdUsers.push(id);

  const invalidPassword = newUser.password.slice(1);

  const loginResponse = await userAPI.loginUser({
    email: newUser.email,
    invalidPassword,
  });
  expect(loginResponse.statusCode).toBe(401);
});
