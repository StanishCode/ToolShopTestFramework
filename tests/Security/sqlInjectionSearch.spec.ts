import { test, expect } from "../../fixtures";

test.only("user cannot inject sql in search", async ({ homePage }) => {
  await homePage.goToHomePage();
  await homePage.searchProduct("' OR 1=1 --");
  await expect(homePage.getNoResultsMsg()).toBeVisible();
});
