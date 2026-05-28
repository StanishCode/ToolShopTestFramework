import { test, expect } from "../../../fixtures";

test("cannot register with a first name longer than 40 characters", async ({
  userAPI,
  userDataGen,
}) => {
  const newUser = userDataGen.generateUser();
  newUser.first_name = "A".repeat(41);

  const response = await userAPI.createUser(newUser);
  expect(response.status()).toBe(422);

  const body = await response.json();
  expect(body).toMatchObject({
    first_name: [
      "The first name field must not be greater than 40 characters.",
    ],
  });
});
