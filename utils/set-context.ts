import { APIRequestContext, request } from "@playwright/test";

//TODO: investigate why context is not being set
export async function setAuthContext(
  context: APIRequestContext,
  token: string,
) {
  context = await request.newContext({
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}
