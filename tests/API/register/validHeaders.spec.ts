import { test, expect } from "../../../fixtures";

test("successfully registering sends a response with valid headers", async ({
  userAPI,
  userDataGen,
  createdUsers,
}) => {
  const newUser = userDataGen.generateUser();
  const response = await userAPI.createUser(newUser);
  const body = await response.json();

  createdUsers.push(body.id);

  expect(response.headers()["content-type"]).toContain("application/json");
});
