import { test } from "../../fixtures";
import { expect } from "@playwright/test";

test.only("Product page displays critical product information", async ({
  productPage,
  productAPI,
}) => {
  const keyword = "Combination Pliers";
  const searchResponse = await productAPI.searchProducts(keyword);
  const body = await searchResponse.json();

  await productPage.goToPdp(body.data[0].id);

  await expect(productPage.getProductName()).toBeVisible();
  await expect(productPage.getProductPrice()).toBeVisible();
  await expect(productPage.getProductImg()).toBeVisible();
  await expect(productPage.getProductDescription()).toBeVisible();
});
