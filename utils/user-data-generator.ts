import { faker } from "@faker-js/faker";
import { APIUser, UIUser } from "../types";

export class UserDataGenerator {
  //TODO: create initialization logic and look into adding payment info
  //      or create a payment info generator, update User type

  generateUser(minAge: number = 18, maxAge: number = 75) {
    return {
      "first_name": faker.person.firstName(),
      "last_name": faker.person.lastName(),
      "address": {
        "house_num": faker.location.buildingNumber(),
        "street": faker.location.street(),
        "city": faker.location.city(),
        "state": faker.location.state(),
        "country": "United States of America (the)",
        "postal_code": faker.location.zipCode("#####"),
      },
      "phone": faker.string.numeric(10),
      "dob": faker.date
        .birthdate({ min: minAge, max: maxAge, mode: "age" })
        .toISOString()
        .split("T")[0],
      "password": "SuperSecure@123",
      "email": faker.internet.email().toLowerCase(),
    };
  }
}
