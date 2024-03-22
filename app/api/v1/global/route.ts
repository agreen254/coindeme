import type { GlobalResponse, WrappedGlobalResponse } from "@/utils/types";

import { getValidationHandler } from "@/utils/fetchValidationHandlers";
import { wrappedGlobalResponseSchema } from "@/validation/schema";
import { NextRequest } from "next/server";

// eslint-disable-next-line
export async function GET(req: NextRequest) {
  const urlExtractor = () => "https://api.coingecko.com/api/v3/global";

  // the default response is { data: {...} } so go ahead and unwrap it
  const responseTransformer = (response: WrappedGlobalResponse) =>
    response.data;

  return getValidationHandler<WrappedGlobalResponse, GlobalResponse>(
    wrappedGlobalResponseSchema,
    urlExtractor,
    responseTransformer
  );
}
