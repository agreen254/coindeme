import type { MarketResponse, SearchElements } from "./types";

export function getSearchElements(data: MarketResponse[] | undefined) {
  return data?.reduce(
    (res: SearchElements, page) => {
      return {
        names: [
          ...res.names,
          ...page.market.map((row) => {
            return { name: row.name };
          }),
        ],
        ids: [
          ...res.ids,
          ...page.market.map((row) => {
            return { id: row.id };
          }),
        ],
      };
    },
    { names: [], ids: [] }
  );
}
