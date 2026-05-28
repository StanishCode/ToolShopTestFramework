import { test, expect } from "../../../fixtures";

test("cannot register if younger than 18", async ({
  userAPI,
  userDataGen,
  createdUsers,
}) => {
  const childUser = userDataGen.generateUser(17, 17);
  const adultUser = userDataGen.generateUser(18, 18);

  //17 year old will fail registration
  const childResponse = await userAPI.createUser(childUser);
  expect(childResponse.status()).toBe(422);
  const childBody = await childResponse.json();
  expect(childBody).toMatchObject({ dob: ["Customer must be 18 years old."] });

  //18 year old will succeed registration
  const adultResponse = await userAPI.createUser(adultUser);
  expect(adultResponse.status()).toBe(201);
  const adultBody = await adultResponse.json();
  expect(adultBody.id).toBeDefined();
  createdUsers.push(adultBody.id);
});
