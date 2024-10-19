"use client";

import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
} from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { useNumSlidesToScroll } from "@/hooks/useNumSlidesToScroll";
import type { MarketQueryResult } from "@/utils/types";
import { flatMarketRes } from "@/utils/flatMarketRes";

import CarouselCard from "./CarouselCard";
import CarouselSkeleton from "./CarouselSkeleton";

type Props = {
  queryResult: MarketQueryResult;
};

/**
 * Built using Embla:
 * https://www.embla-carousel.com/get-started/react/
 */
const CarouselHorizontal = ({
  queryResult: { data, isError, isPending },
}: Props) => {
  const slidesToScroll = useNumSlidesToScroll();
  const carouselData = flatMarketRes(data?.pages);

  const scrollPrevLabelId = useId();
  const scrollNextLabelId = useId();

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "x",
    loop: false,
    slidesToScroll: slidesToScroll,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleScroll = useCallback(() => {
    if (emblaApi) {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      // make sure callback will be updated whenever scrolling occurs
      emblaApi.on("slidesInView", handleScroll);
    }
  }, [emblaApi, handleScroll]);

  const carousel = (() => {
    if (isPending) {
      return (
        <div className="w-[90vw] screen-xl:w-table-xl overflow-x-hidden flex gap-x-2">
          <CarouselSkeleton pulse />
        </div>
      );
    } else if (!data && isError) {
      return (
        <div className="w-[90vw] screen-xl:w-table-xl overflow-x-hidden flex gap-x-2">
          <CarouselSkeleton pulse={false} />
        </div>
      );
    } else {
      return carouselData?.map((coinData) => (
        <CarouselCard key={coinData.id + "carousel"} coinData={coinData} />
      ));
    }
  })();

  return (
    <div className="flex justify-center relative w-[90vw] screen-xl:w-table-xl">
      <div className="absolute screen-xl:mb-0 left-0 screen-xl:-left-9 top-20 screen-xl:top-[10px] z-1 screen-lg:z-10">
        <label id={scrollPrevLabelId} htmlFor="scrollPrev" className="sr-only">
          Scroll carousel backward
        </label>
        <button
          id="scrollPrev"
          aria-labelledby={scrollPrevLabelId}
          className="w-12 h-12 p-2 rounded-full border dark:border-teal-300 border-teal-600 dark:bg-teal-600 bg-teal-500 dark:hover:bg-teal-500 hover:bg-teal-400 transition-colors disabled:cursor-not-allowed"
          disabled={!data || !canScrollPrev}
          onClick={scrollPrev}
        >
          <ChevronLeftIcon
            className="w-5 h-5 ml-1 text-white"
            strokeWidth="2px"
          />
        </button>
      </div>
      <div className="flex justify-center mb-12 screen-xl:mb-0">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex w-[calc(90vw)] screen-xl:w-table-xl space-x-2">
            {carousel}
          </div>
        </div>
      </div>
      <div className="absolute left-14 screen-xl:left-auto screen-xl:-right-9 top-20 screen-xl:top-[10px] z-1 screen-lg:z-10">
        <label id={scrollNextLabelId} htmlFor="scrollNext" className="sr-only">
          Scroll carousel forward
        </label>
        <button
          id="scrollNext"
          aria-labelledby={scrollNextLabelId}
          className="w-12 h-12 p-2 rounded-full border dark:border-teal-300 border-teal-600 dark:bg-teal-600 bg-teal-500 dark:hover:bg-teal-500 hover:bg-teal-400 transition-colors disabled:cursor-not-allowed"
          disabled={!data || !canScrollNext}
          onClick={scrollNext}
        >
          <ChevronRightIcon
            className="w-5 h-5 ml-1 text-white"
            strokeWidth="2px"
          />
        </button>
      </div>
    </div>
  );
};

export default CarouselHorizontal;
