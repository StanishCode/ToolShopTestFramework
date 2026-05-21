import { test } from "../fixtures";
import { expect } from "@playwright/test";

test("Product page displays correct critical info for available product", async ({
  productAPI,
  productPage,
}) => {
  const keyword = "Combination Pliers";
  const productInfo = await productAPI.getFirstProductInfo(keyword);

  await productPage.goToPdp(productInfo.id);

  const pdpInfo = await productPage.getProductInfo();
  expect(pdpInfo.img).toContain(productInfo.product_image.file_name);
  expect(pdpInfo.name).toContain(productInfo.name);
  expect(pdpInfo.price).toBe(productInfo.price.toString());
  expect(productInfo).toBeTruthy();
  expect(productPage.isCartBtnEnabled()).toBeTruthy();
});
