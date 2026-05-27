import { test, expect } from "../../../fixtures";

test.only("cannot register with a duplicate email", async ({
  userAPI,
  userDataGen,
  createdUsers,
}) => {
  //create user check for success response code
  const newUser = userDataGen.generateUser();
  const response = await userAPI.createUser(newUser);
  expect(response.status()).toBe(201);

  const body = await response.json();
  createdUsers.push(body.id);

  //register again with the same user and expect failure response code
  const secondResponse = await userAPI.createUser(newUser);
  expect(secondResponse.status()).toBe(409);
  const secondBody = await secondResponse.json();
  expect(secondBody).toMatchObject({
    email: ["A customer with this email address already exists."],
  });
});
