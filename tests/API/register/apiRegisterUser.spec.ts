import { test, expect } from "../../../fixtures";

test("api register user successfully", async ({
  userAPI,
  userDataGen,
  createdUsers,
}) => {
  const newUser = userDataGen.generateUser();
  const response = await userAPI.createUser(newUser);

  //validate response code
  expect(response.status()).toBe(201);

  //validate response body with critical fields
  const body = await response.json();

  //validate response schema
  expect(body).toMatchObject({
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    email: newUser.email,
  });

  //ensure id is defined and push onto cleanup array
  expect(body.id).toBeDefined();
  createdUsers.push(body.id);

  //ensure creation date is defined
  expect(body.created_at).toBeDefined();
});
