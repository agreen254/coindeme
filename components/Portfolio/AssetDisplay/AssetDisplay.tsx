import type { Asset } from "@/utils/types";

import {
  useAssetCurrentQueries,
  useAssetHistoryQueries,
} from "@/hooks/useAssetQueries";
import { extractDate } from "@/utils/extractDate";

type Props = {
  asset: Asset;
  currentResponse: ReturnType<typeof useAssetCurrentQueries>[number];
  historyResponse: ReturnType<typeof useAssetHistoryQueries>[number];
};

const AssetDisplay = ({ asset, currentResponse, historyResponse }: Props) => {
  const { coinName, date } = asset;

  return (
    <div>
      <p>{coinName}</p>
      <p>
        {extractDate(date).toLocaleString("en-US", { dateStyle: "medium" })}
      </p>
      <p>
        {historyResponse.isLoading
          ? "loading history data..."
          : historyResponse.data?.current_price.usd}
      </p>
      <p>
        {currentResponse.isLoading
          ? "Loading current data..."
          : currentResponse.data?.current_price.usd}
      </p>
    </div>
  );
};

export default AssetDisplay;
