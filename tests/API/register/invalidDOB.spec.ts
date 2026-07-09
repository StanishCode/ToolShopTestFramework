import { test, expect } from "../../../fixtures";

test("cannot register with an invalid dob", async ({
  userAPI,
  userDataGen,
  createdUsers,
}) => {
  const newUser = userDataGen.generateUser();
  newUser.dob = "01/01/2000";

  const response = await userAPI.createUser(newUser);
  const body = await response.json();

  if (response.status() === 201) {
    createdUsers.push(body.id);
  }
  console.log(response.status());
  console.log(body);

  expect(response.status()).toBe(422);
  expect(body).toMatchObject({
    dob: ["The dob field must match the format Y-m-d."],
  });
});
