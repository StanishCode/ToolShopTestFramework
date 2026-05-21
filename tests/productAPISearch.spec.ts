import { test } from "../fixtures";
import { expect } from "@playwright/test";

test("valid product search api request returns correct results", async ({
  productAPI,
}) => {
  const keyword = "hammer";

  const response = await productAPI.searchProducts(keyword);
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody).toHaveProperty("data");
  expect(Array.isArray(responseBody.data)).toBeTruthy();

  const products: any[] = responseBody.data;
  expect(products.length).toBeGreaterThan(0);

  for (let product of products) {
    //TODO: look into utilizing defined object types for this method
    expect(product).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      description: expect.any(String),
      price: expect.any(Number),
      is_location_offer: expect.any(Boolean),
      is_rental: expect.any(Boolean),
      co2_rating: expect.any(String),
      in_stock: expect.any(Boolean),
      is_eco_friendly: expect.any(Boolean),
      product_image: {
        id: expect.any(String),
        by_name: expect.any(String),
        by_url: expect.any(String),
        source_name: expect.any(String),
        source_url: expect.any(String),
        file_name: expect.any(String),
        title: expect.any(String),
      },
      category: { id: expect.any(String), name: expect.any(String) },
      brand: { id: expect.any(String), name: expect.any(String) },
    });
    expect(product.name.toLowerCase()).toContain(keyword);
  }
});
