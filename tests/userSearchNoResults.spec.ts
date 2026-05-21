import { test } from "../fixtures";
import { expect } from "@playwright/test";

test("User search with no results displays no results message", async ({
  homePage,
  page,
}) => {
  const keyword = "hammer";

  await page.route("**/products/search?*", async (route) => {
    const requestUrl = new URL(route.request().url());

    const searchKeyword = requestUrl.searchParams.get("q");

    if (searchKeyword === keyword) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          current_page: 1,
          data: [],
          from: null,
          last_page: 1,
          per_page: 9,
          to: null,
          total: 0,
        }),
      });

      return;
    }

    await route.fallback();
  });

  await homePage.goToHomePage();

  await homePage.searchProduct(keyword);

  await expect(homePage.getNoResultsMsg()).toBeVisible();
  await expect(homePage.getNoResultsMsg()).toHaveText(
    "There are no products found.",
  );
});
