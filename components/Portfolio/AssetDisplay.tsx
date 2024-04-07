import { Asset, AssetHistory } from "@/utils/types";

type Props = {
  asset: Asset;
  history?: AssetHistory;
};

const AssetDisplay = ({ asset, history }: Props) => {
  return (
    <div className="w-full my-4 text-center">
      <p>{asset.assetId}</p>
      <p>{asset.coinName}</p>
      <p>{asset.coinSymbol}</p>
      <p>{asset.value}</p>
      {history && (
        <>
          <p>{history.market_data.current_price.usd}</p>
          <p>{history.market_data.total_volume.usd}</p>
          <p>{history.market_data.market_cap.usd}</p>
        </>
      )}
    </div>
  );
};

export default AssetDisplay;
