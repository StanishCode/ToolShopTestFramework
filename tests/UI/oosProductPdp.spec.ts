import { test, expect } from "../../fixtures";
import { oosProduct } from "../../utils/mocks/oosProduct";

test.only("user cannot add out of stock product to cart", async ({
  productAPI,
  productPage,
  page,
}) => {
  //id can be dynamic, so I need to search for product to confirm id
  //register product api call and mock out of stock
  const keyword = "Combination Pliers";
  const searchResponse = await productAPI.searchProducts(keyword);
  const searchBody = await searchResponse.json();
  const id = searchBody.data[0].id;
  await oosProduct(page, id);
  //wait for page to load
  await productPage.goToPdp(id);
  await expect(productPage.getAddToCartButton()).toBeVisible();
  //check for out of stock message
  await expect(productPage.getOutOfStockMsg()).toContainText("Out of stock");
  //check for disabled add to cart button
  expect(await productPage.isCartBtnEnabled()).toBeFalsy();
});
