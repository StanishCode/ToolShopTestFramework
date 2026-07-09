import { test, expect } from "../../../fixtures";

test("password is not returned in response when successfully registering", async ({
  userAPI,
  userDataGen,
  createdUsers,
}) => {
  const newUser = userDataGen.generateUser();
  const response = await userAPI.createUser(newUser);
  const body = await response.json();

  createdUsers.push(body.id);

  expect(body.password).toBeUndefined();
});
