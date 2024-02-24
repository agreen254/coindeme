"use client";

import type { MarketQueryResult } from "@/utils/types";

import { flatMarketRes } from "@/utils/flatMarketRes";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

import CarouselElement from "./CarouselCard";
import {
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
} from "lucide-react";

type Props = {
  queryResult: MarketQueryResult;
};

const Carousel = ({ queryResult: { data } }: Props) => {
  // show all the fetched coins in the carousel
  const tableData = flatMarketRes(data?.pages);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "y",
    loop: false,
    skipSnaps: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="flex flex-col items-center">
      <button
        className="px-2 py-2 rounded-full border-2 border-carousel-selected-border-from"
        onClick={scrollPrev}
      >
        <ChevronUpIcon className="w-5 h-5" strokeWidth="3px" />
      </button>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex flex-col h-[470px]">
          {tableData?.map((coinData) => (
            <CarouselElement key={coinData.id + "carousel"} coinData={coinData} />
          ))}
        </div>
      </div>
      <button
        className="px-2 py-2 rounded-full border-2 border-carousel-selected-border-from"
        onClick={scrollNext}
      >
        <ChevronDownIcon className="w-5 h-5" strokeWidth="3px" />
      </button>
    </div>
  );
};

export default Carousel;
