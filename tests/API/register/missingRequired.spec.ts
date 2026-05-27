import { test, expect } from "../../../fixtures";

test.only("cannot register when missing required fields", async ({
  userAPI,
  userDataGen,
  createdUsers,
}) => {
  //create new user and set required fields to empty
  const newUser = userDataGen.generateUser();
  newUser.first_name = "";
  newUser.last_name = "";
  newUser.password = "";
  newUser.email = "";

  const response = await userAPI.createUser(newUser);
  expect(response.status()).toBe(422);

  const body = await response.json();

  createdUsers.push(body.id);

  expect(body).toMatchObject({
    first_name: ["The first name field is required."],
    last_name: ["The last name field is required."],
    email: ["The email field is required."],
    password: ["The password field is required."],
  });
});
