import type { GlobalResponse, GlobalResponseWrapped } from "@/utils/types";

import { getValidationHandler } from "@/validation/handler";
import { globalResponseWrappedSchema } from "@/validation/schema";
import { NextRequest } from "next/server";

// eslint-disable-next-line
export async function GET(req: NextRequest) {
  const urlExtractor = () => "https://api.coingecko.com/api/v3/global";

  // the default response is { data: {...} } so go ahead and unwrap it
  const responseTransformer = (
    response: GlobalResponseWrapped
  ): GlobalResponse => response.data;

  return getValidationHandler<GlobalResponseWrapped, GlobalResponse>(
    globalResponseWrappedSchema,
    urlExtractor,
    responseTransformer
  );
}
