import { faker } from "@faker-js/faker";

export function generatePassword(length = 16): string {
  const upper = faker.string.alpha({ length: 1, casing: "upper" });
  const lower = faker.string.alpha({ length: 1, casing: "lower" });
  const number = faker.string.numeric(1);
  const special = faker.helpers.arrayElement([
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
  ]);
  const remainingPassword = faker.string.alphanumeric(length - 4);
  return faker.helpers
    .shuffle([...upper, ...lower, ...number, special, ...remainingPassword])
    .join("");
}
