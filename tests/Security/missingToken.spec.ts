import { test, expect } from "../../fixtures";

test("user cannot access protected api path without token", async ({
  userAPI,
  userDataGen,
  createdUsers,
}) => {
  const newUser = userDataGen.generateUser();
  const response = await userAPI.createUser(newUser);
  const registeredUser = await response.json();

  expect(response.status()).toBe(201);

  createdUsers.push(registeredUser.id);

  //Successful valid login
  const { access_token, statusCode } = await userAPI.loginUser({
    email: newUser.email,
    password: newUser.password,
  });
  expect(statusCode).toBe(200);
  expect(access_token.length).toBeGreaterThan(0);

  //access protect api path without access token
  const userResponse = await userAPI.getCurrentUser({ access_token: "" });
  const responseMsg = await userResponse.json();
  expect(userResponse.status()).toBe(401);
  expect(responseMsg).toMatchObject({ message: "Unauthorized" });
});
