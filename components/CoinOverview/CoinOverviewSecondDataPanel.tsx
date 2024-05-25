"use client";

import { Infinity as InfinityIcon } from "lucide-react";
import RoundButtonIcon from "@/Icons/RoundButton";

import { useCoinQuery } from "@/hooks/useCoinQuery";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";
import { cn } from "@/utils/cn";
import { getOrdinal } from "@/utils/getOrdinal";

import Panel from "../Theme/Panel";

type Props = {
  response: ReturnType<typeof useCoinQuery>;
};

const CoinOverviewSecondDataPanel = ({ response }: Props) => {
  const currency = useUserCurrencySetting();
  const fmt = (n: number | undefined) =>
    n
      ? Intl.NumberFormat("en-US", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 0,
        }).format(n)
      : null;
  const fmtCurr = (n: number | undefined) =>
    n
      ? Intl.NumberFormat("en-US", {
          style: "currency",
          currency: currency,
          minimumFractionDigits: 0,
        }).format(n)
      : null;

  const LiDataIcon = () => (
    <RoundButtonIcon className="-mt-4 -mb-5 -mr-5 inline" />
  );

  const totalVolume = fmtCurr(
    response.data?.market_data.total_volume[currency]
  );
  const totalVolumeLabel = "Total Volume";

  const marketCap = fmtCurr(response.data?.market_data.market_cap[currency]);
  const marketCapLabel = "Market Cap";

  const fdv = (() => {
    const fullyDilutedValuation =
      response.data?.market_data?.fully_diluted_valuation;
    const hasFDV = fullyDilutedValuation && fullyDilutedValuation[currency];
    return hasFDV ? (
      fmtCurr(fullyDilutedValuation[currency])
    ) : (
      <span className="text-muted-foreground">N/A</span>
    );
  })();
  const fdvLabel = "Fully Diluted Valuation";

  const circulatingSupply = (() => {
    const supply = response.data?.market_data.circulating_supply;
    return supply === null ? (
      <InfinityIcon className="h-6 w-6 inline" />
    ) : (
      fmt(supply)
    );
  })();
  const circulatingSupplyLabel = "Circulating Supply";

  const maxSupply = (() => {
    const supply = response.data?.market_data.max_supply;
    return supply === null ? (
      <InfinityIcon className="h-6 w-6 inline" />
    ) : (
      fmt(supply)
    );
  })();
  const maxSupplyLabel = "Max Supply";

  const rank = (() => {
    const n = response.data?.market_cap_rank;
    return n ? n.toString() + getOrdinal(n) : "N/A";
  })();
  const rankLabel = "Market Cap Rank";

  const genDate = (() => {
    const d = response.data?.genesis_date;
    return d ? (
      new Date(d).toLocaleDateString("en-US", { dateStyle: "long" })
    ) : (
      <span className="text-muted-foreground">N/A</span>
    );
  })();

  const entries = [
    { value: rank, label: rankLabel, useSymbol: false },
    { value: marketCap, label: marketCapLabel, useSymbol: false },
    { value: fdv, label: fdvLabel, useSymbol: false },
    { value: totalVolume, label: totalVolumeLabel, useSymbol: false },
    {
      value: circulatingSupply,
      label: circulatingSupplyLabel,
      useSymbol: true,
    },
    { value: maxSupply, label: maxSupplyLabel, useSymbol: true },
    { value: genDate, label: "Genesis Date", useSymbol: false },
  ];

  return (
    <Panel
      className={cn(
        "w-full h-[400px]",
        response.isPending && "animate-pulse"
      )}
    >
      {response.data && (
        <ul className="*:my-3 first:mt-0">
          {entries.map((entry) => (
            <li
              key={entry.label}
              className="grid grid-cols-2 items-center text-lg"
            >
              <span className="font-light">
                <LiDataIcon />
                {entry.label}
              </span>
              <span className="text-xl font-medium -translate-y-1">
                <span className="mr-2">{entry.value}</span>
                <span className="font-medium">
                  {entry.useSymbol && response.data.symbol.toUpperCase()}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
};

export default CoinOverviewSecondDataPanel;
