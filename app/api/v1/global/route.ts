import type { GlobalResponseUnwrapped, GlobalResponse } from "@/utils/types";

import { getValidationHandler } from "@/validation/handler";
import { globalResponseSchema } from "@/validation/schema";
import { NextRequest } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

// eslint-disable-next-line
export async function GET(req: NextRequest) {
  /**
   * This route will be compiled as a static page at build-time and return a 304 Not Modified status whenever the page is loaded.
   * This is bad because the user will not get updated data.
   * 
   * NoStore() method will force it to be a dynamic page and refetch from the coingecko api each time.
   */
  noStore();
  const urlExtractor = () => "https://api.coingecko.com/api/v3/global";

  // the default response is { data: {...} } so go ahead and unwrap it
  const responseTransformer = (
    response: GlobalResponse
  ): GlobalResponseUnwrapped => response.data;

  return getValidationHandler<GlobalResponse, GlobalResponseUnwrapped>(
    globalResponseSchema,
    urlExtractor,
    responseTransformer
  );
}
