"use client";

import type { MarketQueryResult } from "@/utils/types";

import { flatMarketRes } from "@/utils/flatMarketRes";
import { useCallback, useEffect, useState } from "react";
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

/**
 * Built using Embla:
 * https://www.embla-carousel.com/get-started/react/
 */
const Carousel = ({ queryResult: { data } }: Props) => {
  const carouselData = flatMarketRes(data?.pages);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "y",
    loop: false,
    skipSnaps: false,
    slidesToScroll: 5,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleScrollPrev = useCallback(() => {
    if (emblaApi) setCanScrollPrev(emblaApi.canScrollPrev());
  }, [emblaApi]);

  const handleScrollNext = useCallback(() => {
    if (emblaApi) setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  // make sure callbacks will fire whenever carousel view is changed
  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("slidesInView", handleScrollPrev);
      emblaApi.on("slidesInView", handleScrollNext);
    }
  }, [emblaApi]);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-2">
        <button
          className="w-10 h-10 p-2 rounded-full border-2 border-carousel-selected-border-from disabled:cursor-not-allowed"
          disabled={!data || !canScrollPrev}
          onClick={scrollPrev}
        >
          <ChevronUpIcon className="w-5 h-5" strokeWidth="3px" />
        </button>
      </div>
      <div className="flex flex-col items-center">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex flex-col h-[456px]">
            {carouselData ? (
              carouselData.map((coinData) => (
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
      <div className="mt-2">
        <button
          className="w-10 h-10 p-2 rounded-full border-2 border-carousel-selected-border-from disabled:cursor-not-allowed"
          disabled={!data || !canScrollNext}
          onClick={scrollNext}
        >
          <ChevronDownIcon className="w-5 h-5" strokeWidth="3px" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
