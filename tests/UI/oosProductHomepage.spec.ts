import { test, expect } from "../../fixtures";
import { oosHomeProduct } from "../../utils/mocks/oosHomeProduct";

test.only("unavailable products display out of stock message", async ({
  homePage,
  page,
}) => {
  //register initial product api call
  await oosHomeProduct(page);
  await homePage.goToHomePage();

  //validate out of stock message is displayed
  await expect(homePage.getAllProducts()).toBeVisible();
  const { productAvailability } = await homePage.getFirstProductInfo();
  await expect(productAvailability).toContainText("Out of stock");
});
