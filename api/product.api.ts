//TODO: need to create product api class
import { APIRequestContext } from "@playwright/test";

export class ProductAPI {
  constructor(private request: APIRequestContext) {}

  async searchProducts(keyword: string) {
    return await this.request.get(
      "https://api.practicesoftwaretesting.com/products/search",
      { params: { q: keyword } },
    );
  }

  async getFirstProductInfo(keyword: string) {
    const response = await this.searchProducts(keyword);
    const products = await response.json();

    return products.data[0];
  }
}
