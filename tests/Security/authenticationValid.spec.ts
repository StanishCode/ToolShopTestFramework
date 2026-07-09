import { test, expect } from "../../fixtures";

test("user is authenticated with valid login", async ({
  userAPI,
  userDataGen,
  createdUsers,
}) => {
  const newUser = userDataGen.generateUser();
  const response = await userAPI.createUser(newUser);
  expect(response.status()).toBe(201);
  const { id } = await response.json();

  createdUsers.push(id);

  const loginResponse = await userAPI.loginUser({
    email: newUser.email,
    password: newUser.password,
  });
  expect(loginResponse.statusCode).toBe(200);
});
