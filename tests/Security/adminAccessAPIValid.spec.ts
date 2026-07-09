import { test, expect } from "../../fixtures";

test("admin can access admin API paths", async ({
  userAPI,
  userDataGen,
  createdUsers,
}) => {
  const newUser = userDataGen.generateUser();
  const response = await userAPI.createUser(newUser);
  expect(response.status()).toBe(201);

  const { id } = await response.json();
  createdUsers.push(id);

  const deletionResponse = await userAPI.deleteUser(id);
  expect(deletionResponse.status()).toBe(204);
});
