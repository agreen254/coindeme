import { composeFetchUrl } from "@/utils/composeFetchUrl";
import { SearchItem, SearchRequest, SearchResponse } from "@/utils/types";
import { postValidationHandler } from "@/validation/handler";
import { searchRequestSchema, searchResponseSchema } from "@/validation/schema";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  function urlExtractor(body: SearchRequest) {
    const { query } = body;

    return composeFetchUrl({
      head: "https://api.coingecko.com/api/v3",
      body: `/search?query=${query}`,
      tail: `&x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`,
    });
  }

  function responseTransformer(
    // eslint-disable-next-line
    body: SearchRequest,
    response: SearchResponse
  ): SearchItem[] {
    return response.coins;
  }

  return postValidationHandler<SearchRequest, SearchResponse, SearchItem[]>(
    req,
    searchRequestSchema,
    searchResponseSchema,
    urlExtractor,
    responseTransformer
  );
}
