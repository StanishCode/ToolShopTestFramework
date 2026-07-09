import { APIRequestContext } from "@playwright/test";

export class UserAPI {
  constructor(private request: APIRequestContext) {}

  async createUser(userData: any) {
    return this.request.post(
      "https://api.practicesoftwaretesting.com/users/register",
      { data: userData },
    );
  }

  //return token for authentication and status code for test validation
  async loginUser(loginInfo: any) {
    const response = await this.request.post(
      "https://api.practicesoftwaretesting.com/users/login",
      { data: loginInfo },
    );
    const statusCode = response.status();
    const { access_token } = await response.json();

    return { access_token, statusCode };
  }

  async loginAdmin() {
    return this.request.post(
      "https://api.practicesoftwaretesting.com/users/login",
      {
        data: {
          "email": "admin@practicesoftwaretesting.com",
          "password": "welcome01",
        },
      },
    );
  }

  async logoutUser() {
    return this.request.get(
      "https://api.practicesoftwaretesting.com/users/logout",
    );
  }

  async getCurrentUser(data: any) {
    const { access_token } = await this.loginUser(data);
    return this.request.get(
      "https://api.practicesoftwaretesting.com/users/me",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
  }

  async searchUser(keyword: string) {
    const response = await this.loginAdmin();

    const { access_token } = await response.json();

    return this.request.get(
      `https://api.practicesoftwaretesting.com/users/search?q=${keyword}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
  }

  async deleteUser(id: string, isAdmin = true, email = "", password = "") {
    let access_token = "";
    if (isAdmin) {
      const response = await this.loginAdmin();
      const body = await response.json();
      access_token = body.access_token;
    } else {
      const response = await this.loginUser({ email, password });
      access_token = response.access_token;
    }
    return this.request.delete(
      `https://api.practicesoftwaretesting.com/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
  }
}
