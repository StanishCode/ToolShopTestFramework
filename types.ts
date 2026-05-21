//TODO: need to add products
//TODO: need to refactor defined types
export interface APIUser {
  first_name: string;
  last_name: string;
  address: {
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

export interface UIUser {
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
