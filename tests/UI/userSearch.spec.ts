import { test } from "../../fixtures";
import { expect } from "@playwright/test";

test.only("keyword search returns matching products", async ({
  homePage,
  page,
}) => {
  const keyword = "hammer";

  //go to homepage
  await homePage.goToHomePage();
  await expect(homePage.getFirstProduct()).toBeVisible();
  const defaultProducts = await homePage.getAllProductNames();

  //enter keyword in searchbar then search
  await Promise.all([
    page.waitForResponse(
      (response) =>
        response.url().includes("/products/search") &&
        response.request().method() === "GET" &&
        response.status() === 200,
    ),
    homePage.searchProduct(keyword),
  ]);

  //wait for search caption to render and wait for search results to render
  await expect(homePage.getSearchCaption()).toContainText(keyword);
  await expect
    .poll(async () => {
      return await homePage.getAllProductNames();
    })
    .not.toEqual(defaultProducts);

  //retrieve all product names and validate containing keyword
  const names = await homePage.getAllProductNames();
  expect(names.length).toBeGreaterThan(0);

  for (const name of names) {
    expect(name.toLowerCase()).toContain(keyword.toLowerCase());
  }
});
