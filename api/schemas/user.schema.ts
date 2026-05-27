export const userSchema = {
  type: "object",
  properties: {
    first_name: { type: "string" },
    last_name: { type: "string" },
    phone: { type: "string" },
    dob: { type: "string" },
    email: { type: "string" },
    id: { type: "string" },
    created_at: { type: "string" },
    address: {
      type: "object",
      properties: {
        street: { type: "string" },
        house_number: { type: "null" },
        city: { type: "string" },
        state: { type: "string" },
        country: { type: "string" },
        postal_code: { type: "string" },
      },
    },
  },
};
