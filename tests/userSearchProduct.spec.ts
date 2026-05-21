import { test } from "../fixtures";
import { expect } from "@playwright/test";

//TODO: further investigate for dynamic content to mask
test("search result products have valid display", async ({
  homePage,
  page,
}) => {
  const keyword = "hammer";

  await homePage.goToHomePage();

  //wait for search api to resolve before scraping products
  const responsePromise = page.waitForResponse(
    (response) =>
      response.url().includes("/products/search") &&
      response.request().method() === "GET",
  );

  await homePage.searchProduct(keyword);

  await responsePromise;

  await expect(homePage.getFirstProduct()).toHaveScreenshot(
    "first-product.png",
    {
      maxDiffPixelRatio: 0.01,
    },
  );
});
