import { test, expect } from "../../../fixtures";
import Ajv from "ajv";
import { userSchema } from "../../../api/schemas/user.schema";

const ajv = new Ajv();

test("register response matches schema", async ({
  userAPI,
  userDataGen,
  createdUsers,
}) => {
  const newUser = userDataGen.generateUser();
  const response = await userAPI.createUser(newUser);
  expect(response.status()).toBe(201);

  const body = await response.json();

  createdUsers.push(body.id);

  const validate = ajv.compile(userSchema);
  const valid = validate(body);
  expect(valid).toBeTruthy();
});
