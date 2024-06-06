import type { MarketElementNoIdx } from "@/utils/types";

import { cn } from "@/utils/cn";
import { currencyMap } from "@/utils/maps";
import { formatLongName, formatPriceValue } from "@/utils/formatHelpers";
import {
  useCarouselActions,
  useCarouselCardIsSelected,
  useCarouselHasMaxSelected,
} from "@/hooks/useCarousel";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";

import Image from "next/image";
import PricePercentageChange from "../PricePercentageChange";

type Props = {
  coinData: MarketElementNoIdx;
};

const CarouselElement = ({ coinData }: Props) => {
  const currency = useUserCurrencySetting();
  const {
    id,
    name,
    symbol,
    image,
    current_price,
    price_change_percentage_24h,
  } = coinData;

  const currencySymbol = currencyMap.get(currency);

  const { handleSelect } = useCarouselActions();
  const hasMaxSelected = useCarouselHasMaxSelected();
  const isSelected = useCarouselCardIsSelected(id);
  const cannotBeSelected = hasMaxSelected && !isSelected;

  return (
    <button
      className={cn(
        "group p-0 m-0 flex-[0_0_auto] flex-col h-[72px] mb-4 py-3 justify-center w-[15rem] rounded-md bg-teal-900/80 disabled:cursor-not-allowed",
        !hasMaxSelected &&
          "hover:bg-gradient-to-b hover:from-carousel-focus hover:to-carousel-focus/10",
        isSelected &&
          "border-carousel-selected-to bg-gradient-to-b from-carousel-selected to-carousel-selected/20 shadow-md shadow-sky-600/70",
        cannotBeSelected && "hover:bg-teal-900/50"
      )}
      disabled={hasMaxSelected && !isSelected}
      onClick={() => handleSelect(id)}
    >
      <div className="flex justify-start items-center">
        <div className="ml-4">
          <Image
            src={image}
            alt={`${name} logo`}
            width={40}
            height={40}
            priority
          />
        </div>
        <div className="flex flex-col w-full ml-3 items-start">
          <span>
            <span>{formatLongName(name, 12)}</span>
            <span
              className={cn(
                "ml-1 text-gray-400 text-sm uppercase font-semibold",
                !hasMaxSelected && "group-hover:text-gray-300",
                isSelected && "text-gray-300"
              )}
            >
              {symbol}
            </span>
          </span>
          <span className="flex w-full space-x-4 text-sm">
            <span>
              {currencySymbol}
              {formatPriceValue(current_price)}
            </span>
            <span className="font-semibold">
              <PricePercentageChange change={price_change_percentage_24h} />
            </span>
          </span>
        </div>
      </div>
    </button>
  );
};

export default CarouselElement;
