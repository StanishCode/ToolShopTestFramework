import { test, expect } from "../../../fixtures";

test.only("password must include uppercase, lowercase, number, and symbol to register", async ({
  userAPI,
  userDataGen,
  createdUsers,
}) => {
  //generate user with password that does not have uppercase, number, nor symbol
  const newUser = userDataGen.generateUser();
  newUser.password = "itsapassword";

  const response = await userAPI.createUser(newUser);
  expect(response.status()).toBe(422);

  const body = await response.json();

  createdUsers.push(body.id);

  expect(body).toMatchObject({
    "password": [
      "The password field must contain at least one uppercase and one lowercase letter.",
      "The password field must contain at least one symbol.",
      "The password field must contain at least one number.",
    ],
  });
});
