import { APIRequestContext } from "@playwright/test";

export class CartAPI {
  constructor(private request: APIRequestContext) {}

  async createNewCart() {
    const createResponse = await this.request.post(
      "https://api.practicesoftwaretesting.com/carts",
    );
    const { id } = await createResponse.json();
    const statusCode = createResponse.status();

    return { id, statusCode };
  }

  async getCart(cartID: string | null) {
    const response = await this.request.get(
      `https://api.practicesoftwaretesting.com/carts/${cartID}`,
    );
    const cartInfo = await response.json();
    const totalItems = cartInfo.cart_items.reduce(
      (total: number, item: any) => (total = total + item.quantity),
      0,
    );
    const statusCode = response.status();

    return { cartInfo, totalItems, statusCode };
  }

  async addToCart(cartID: string | null, productInfo: any) {
    return await this.request.post(
      `https://api.practicesoftwaretesting.com/carts/${cartID}`,
      { data: productInfo },
    );
  }
}
