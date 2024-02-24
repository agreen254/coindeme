import type { MarketElementNoIdx } from "@/utils/types";

import { formatLongName } from "@/utils/formatHelpers";

import Image from "next/image";
import PricePercentageChange from "../PricePercentageChange";

type Props = {
  coinData: MarketElementNoIdx;
};

const CarouselElement = ({ coinData }: Props) => {
  const { name, symbol, image, current_price, price_change_percentage_24h } =
    coinData;
  return (
    <div className="flex-[0_0_auto] min-h-0 mb-4 py-4 flex-col justify-center w-[15rem] border bg-teal-900/80 rounded-md">
      <div className="flex justify-start items-center">
        <div className="ml-4">
          <Image src={image} alt={`${name} logo`} width={35} height={35} />
        </div>
        <div className="flex flex-col w-full ml-3">
          <span>
            <span>{formatLongName(name, 12)}</span>
            <span className="ml-1 text-gray-400 text-sm uppercase font-semibold">
              {symbol}
            </span>
          </span>
          <span className="flex w-full space-x-4 text-sm">
            <span>
              {"$" + Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(current_price)}
            </span>
            <span>
              <PricePercentageChange change={price_change_percentage_24h} />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CarouselElement;
