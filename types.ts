//TODO: need to add products
export interface User {
  first_name: string;
  last_name: string;
  address: {
    house_num: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
  };
  phone: string;
  dob: string;
  password: string;
  email: string;
}
