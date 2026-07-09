import { test, expect } from "../../../fixtures";

//TODO: need to look into password creation, recieved password in data leak exception
test("register contract", async ({ userAPI, userDataGen, createdUsers }) => {
  const newUser = userDataGen.generateUser();
  const response = await userAPI.createUser(newUser);
  const body = await response.json();

  createdUsers.push(body.id);

  expect(body).toMatchObject({
    first_name: expect.any(String),
    last_name: expect.any(String),
    phone: expect.any(String),
    dob: expect.any(String),
    email: expect.any(String),
    id: expect.any(String),
    created_at: expect.any(String),
    address: {
      street: expect.any(String),
      house_number: null,
      city: expect.any(String),
      state: expect.any(String),
      country: expect.any(String),
      postal_code: expect.any(String),
    },
  });
});
