import { Page } from "@playwright/test";

export async function oosHomeProduct(page: Page) {
  await page.route(
    "**/products?page=1&between=price,1,100&is_rental=false",
    async (route) => {
      const response = await route.fetch();
      const body = await response.json();
      const [firstProduct] = body.data;
      firstProduct.in_stock = false;
      const newBody = body;
      newBody.data = [firstProduct];

      await route.fulfill({ response, body: JSON.stringify(body) });
    },
  );
}
