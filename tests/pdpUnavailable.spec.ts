import { test } from "../fixtures";
import { expect } from "@playwright/test";

test("Unavailable products display correct message and user is unable to add to cart", async ({
  homePage,
  productPage,
  page,
}) => {
  const keyword = "Combination Pliers";
  let productInfo: any;

  //register api products request for page 1 and modify product that matches keyword
  //to be out of stock
  await page.route(
    "**/products?page=1&between=price,1,100&is_rental=false",
    async (route) => {
      const response = await route.fetch();
      const body = await response.json();

      for (const product of body.data) {
        if (product.name === keyword) {
          product.in_stock = 0;
          productInfo = product;
        }
      }

      await route.fulfill({ response, body: JSON.stringify(body) });
    },
  );

  await homePage.goToHomePage();

  const mockedProduct = await homePage.getProductInfo(keyword);
  expect(mockedProduct.productAvailability).toBeVisible();

  //mock and modify the api product search to be out of stock
  await page.route(`**/products/${productInfo.id}`, async (route) => {
    const response = await route.fetch();
    const body = await response.json();
    body.in_stock = 0;

    await route.fulfill({ response, body: JSON.stringify(body) });
  });

  //wait for product page to load
  await Promise.all([
    page.waitForResponse(
      (response) =>
        response.url().includes(`/products/${productInfo.id}`) &&
        response.request().method() === "GET" &&
        response.ok(),
    ),
    productPage.goToPdp(productInfo.id),
  ]);
  await expect(productPage.getProductName()).toBeVisible();
  expect(await productPage.isProductOutOfStock()).toBeTruthy();
  expect(await productPage.isCartBtnEnabled()).toBeFalsy();
});
