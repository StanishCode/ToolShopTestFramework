import { test, expect } from "../../../fixtures";

test("cannot register with an invalid email", async ({
  userAPI,
  userDataGen,
  createdUsers,
}) => {
  const newUser = userDataGen.generateUser();
  //need a dynamic invalid email missing "@"
  newUser.email = `${Date.now()}email.com`;
  const response = await userAPI.createUser(newUser);

  expect(response.status());
  const body = await response.json();

  //if user was created then push onto cleanup array
  if (response.status() === 201) {
    createdUsers.push(body?.id);
  }

  expect(response.status()).toBe(422);
  expect(body).toMatchObject({ email: ["Email format is invalid"] });
});
