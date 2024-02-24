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
    <div className="flex flex-col justify-center basis-full mb-4 py-2 min-h-16 w-[15rem] border bg-teal-900/80 rounded-md">
      <div className="flex justify-start items-center">
        <div className="ml-2">
          <Image src={image} alt={`${name} logo`} width={35} height={35} />
        </div>
        <div className="flex flex-col ml-2">
          <span>
            <span>{formatLongName(name, 12)}</span>
            <span className="ml-1 text-gray-400 text-sm uppercase font-semibold">
              {symbol}
            </span>
          </span>
          <span className="space-x-2 text-sm ">
            <span>{current_price.toLocaleString("en-US")}</span>
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
