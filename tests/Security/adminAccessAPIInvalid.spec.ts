import { test, expect } from "../../fixtures";

test("users cannot access admin API paths", async ({
  userAPI,
  userDataGen,
  createdUsers,
}) => {
  const newUser = userDataGen.generateUser();
  const response = await userAPI.createUser(newUser);
  expect(response.status()).toBe(201);

  const { id } = await response.json();
  createdUsers.push(id);

  const deletionResponse = await userAPI.deleteUser(
    id,
    false,
    newUser.email,
    newUser.password,
  );
  expect(deletionResponse.status()).toBe(403);
});
