import {
  test as base,
  Page,
  request as playwrightRequest,
} from "@playwright/test";
import { RegisterPage } from "./pages/RegisterPage";
import { SignInPage } from "./pages/SignInPage";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { CartCheckoutPage } from "./pages/CartCheckoutPage";
import { UserAPI } from "./api/user.api";
import { ProductAPI } from "./api/product.api";
import { CartAPI } from "./api/cart.api";
import { UserDataGenerator } from "./utils/user-data-generator";
import { APIUser, UIUser } from "./types";

//TODO: look into optional data fixtures for users and products
type TestFixtures = {
  page: Page;
  registerPage: RegisterPage;
  signinPage: SignInPage;
  homePage: HomePage;
  productPage: ProductPage;
  cartCheckoutPage: CartCheckoutPage;
  //testUser?: User;
  userAPI: UserAPI;
  productAPI: ProductAPI;
  cartAPI: CartAPI;
  createdUsers: string[];
};

type WorkerFixtures = {
  userDataGen: UserDataGenerator;
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
  page: async ({ page }, use) => {
    await use(page);
  },
  //Page Object fixtures
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  signinPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartCheckoutPage: async ({ page }, use) => {
    await use(new CartCheckoutPage(page));
  },
  //API fixtures
  userAPI: async ({}, use) => {
    const apiContext = await playwrightRequest.newContext();

    await use(new UserAPI(apiContext));

    await apiContext.dispose();
  },
  productAPI: async ({}, use) => {
    const apiContext = await playwrightRequest.newContext();

    await use(new ProductAPI(apiContext));

    await apiContext.dispose();
  },
  cartAPI: async ({}, use) => {
    const apiContext = await playwrightRequest.newContext();

    await use(new CartAPI(apiContext));

    await apiContext.dispose();
  },
  createdUsers: async ({}, use) => {
    const users: string[] = [];
    await use(users);

    //after test, delete any created users
    //need to create a new context and instance of user api to tear
    //down created users during test
    if (users.length > 0) {
      const apiContext = await playwrightRequest.newContext();
      const userApi = new UserAPI(apiContext);

      try {
        await userApi.loginAdmin();
        await Promise.all(users.map((user) => userApi.deleteUser(user)));
      } catch (error) {
        console.error(error);
      } finally {
        await apiContext.dispose();
      }

      try {
      } catch (error) {
        console.error(error);
      }
    }
  },
  //Worker Fixtures
  userDataGen: [
    async ({}, use) => {
      const userDataGen = new UserDataGenerator();
      await use(userDataGen);
      //TODO: make sure test data is isolated, look into teardown logic
    },
    { scope: "worker" },
  ],
});
