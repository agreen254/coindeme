"use client";

import type { MarketQueryResult } from "@/utils/types";

import { flatMarketRes } from "@/utils/flatMarketRes";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

import CarouselElement from "./CarouselCard";
import CarouselSkeleton from "./CarouselSkeleton";
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
    slidesToScroll: 5,
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
        className="w-10 h-10 p-2 rounded-full border-2 border-carousel-selected-border-from"
        disabled={!data}
        onClick={scrollPrev}
      >
        <ChevronUpIcon className="w-5 h-5" strokeWidth="3px" />
      </button>
      <div className="flex flex-col items-center">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex flex-col h-[458px]">
            {tableData ? (
              tableData.map((coinData) => (
                <CarouselElement
                  key={coinData.id + "carousel"}
                  coinData={coinData}
                />
              ))
            ) : (
              <CarouselSkeleton />
            )}
          </div>
        </div>
      </div>
      <button
        className="w-10 h-10 p-2 rounded-full border-2 border-carousel-selected-border-from"
        disabled={!data}
        onClick={scrollNext}
      >
        <ChevronDownIcon className="w-5 h-5" strokeWidth="3px" />
      </button>
    </div>
  );
};

export default Carousel;
