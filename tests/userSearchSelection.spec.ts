import { test } from "../fixtures";
import { expect } from "@playwright/test";

test("User selects first result from search", async ({
  homePage,
  productPage,
  page,
}) => {
  const keyword = "Combination Pliers";

  await homePage.goToHomePage();

  await homePage.searchProduct(keyword);

  const productInfo = await homePage.getFirstProductInfo();
  await homePage.selectFirstProduct();

  //Validate product page matches selected search result
  const pdpInfo = await productPage.getProductInfo();
  expect(productInfo.productName).toBe(pdpInfo.name);
});
