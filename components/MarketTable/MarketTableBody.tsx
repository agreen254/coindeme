"use client";

import type { MarketElementWithIdx } from "@/utils/types";

import { getCurrencySymbol } from "@/utils/getCurrencySymbol";
import { formatLongName, formatSmallNum } from "@/utils/formatHelpers";

import Image from "next/image";
import PricePercentageChange from "../PricePercentageChange";
import MarketTableProgressWidget from "./MarketTableProgressWidget";
import MarketTableSparkline from "./MarketTableSparkline";
import { default as TD } from "./MarketTableBodyCell";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";

type Props = {
  data: MarketElementWithIdx[];
  initialIdx?: number;
};

const MarketTableBody = ({ data, initialIdx }: Props) => {
  const currency = useUserCurrencySetting();
  const isGaining = (n: number | null) => (n ?? 0) > 0;

  return (
    <tbody>
      {data?.map(
        ({
          id,
          name,
          symbol,
          called_index,
          circulating_supply,
          current_price,
          market_cap,
          total_supply,
          total_volume,
          image: imageURL,
          price_change_percentage_1h_in_currency: change_1h,
          price_change_percentage_24h_in_currency: change_24h,
          price_change_percentage_7d_in_currency: change_7d,
          sparkline_in_7d: { price: data_7d },
        }) => (
          <tr key={id} className="hover:dark:bg-slate-800/60 hover:bg-zinc-200 transition-colors bg-white dark:bg-inherit">
            <TD className="text-center border-l rounded-l-md">
              {called_index + 1 + (initialIdx ?? 0)}
            </TD>
            <TD className="text-start">
              <Image
                className="inline mr-2"
                src={imageURL.replace("large", "thumb")}
                alt={`${name} logo`}
                width={30}
                height={30}
                priority
              />
              <span>{formatLongName(name, 22, symbol)}</span>{" "}
              <span className="text-gray-400 text-sm uppercase font-semibold">
                {symbol.trim()}
              </span>
            </TD>
            <TD className="font-mono">
              {getCurrencySymbol(currency)}
              {current_price < 0.01
                ? formatSmallNum(current_price)
                : current_price.toLocaleString("en-US")}
            </TD>
            <TD className="font-mono">
              <PricePercentageChange change={change_1h} />
            </TD>
            <TD className="font-mono">
              <PricePercentageChange change={change_24h} />
            </TD>
            <TD className="font-mono">
              <PricePercentageChange change={change_7d} />
            </TD>
            <TD>
              <MarketTableProgressWidget
                leftNumber={total_volume}
                rightNumber={market_cap}
                isGaining={isGaining(change_7d)}
              />
            </TD>
            <TD>
              <MarketTableProgressWidget
                leftNumber={circulating_supply}
                rightNumber={total_supply}
                isGaining={isGaining(change_7d)}
              />
            </TD>
            <TD className="border-r rounded-r-md">
              <MarketTableSparkline
                data={data_7d}
                id={id}
                isGaining={isGaining(change_7d)}
              />
            </TD>
          </tr>
        )
      )}
    </tbody>
  );
};

export default MarketTableBody;
