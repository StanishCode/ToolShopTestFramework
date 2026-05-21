import { test } from "../fixtures";
import { expect } from "@playwright/test";

test("User happy flow for product search", async ({ homePage, page }) => {
  const keyword = "hammer";

  await homePage.goToHomePage();

  //wait for search api to resolve before scraping products
  const searchResponse = page.waitForResponse(
    (response) =>
      response.url().includes("/search") &&
      response.request().method() === "GET" &&
      response.ok(),
  );

  await homePage.searchProduct(keyword);
  await searchResponse;

  //Retrieve all search results and validate names with keyword
  const products = await homePage.getAllProductsInfo();
  for (let product of products) {
    expect(product.toLowerCase()).toContain(keyword);
  }
});
