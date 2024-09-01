import { NextRequest } from "next/server";
import {
  CoinSearchRequest,
  CoinSearchResponse,
  CoinSearchResponseUnit,
} from "@/utils/types";
import { composeFetchUrl } from "@/utils/composeFetchUrl";
import { postValidationHandler } from "@/validation/handler";
import {
  coinSearchRequestSchema,
  coinSearchResponseSchema,
} from "@/validation/schema";

export async function POST(req: NextRequest) {
  function urlExtractor(body: CoinSearchRequest) {
    const { query } = body;

    return composeFetchUrl({
      head: "   https://api.coingecko.com/api/v3/search               ",
      body: `   ?query=${query}                                       `,
      tail: `   $x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}   `,
    });
  }

  /**
   * The default response contains other information including exchanges and NFTs.
   * In this case we only want the coins themselves, so immediately unwrap them.
   *
   * https://docs.coingecko.com/v3.0.1/reference/search-data
   */
  function responseTransformer(
    _: CoinSearchRequest,
    response: CoinSearchResponse
  ) {
    return response.coins;
  }

  return postValidationHandler<
    CoinSearchRequest,
    CoinSearchResponse,
    CoinSearchResponseUnit[]
  >(
    req,
    coinSearchRequestSchema,
    coinSearchResponseSchema,
    urlExtractor,
    responseTransformer
  );
}
