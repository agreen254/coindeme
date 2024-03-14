"use client";

import type { MarketQueryResult } from "@/utils/types";

import { flatMarketRes } from "@/utils/flatMarketRes";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import CarouselCard from "./CarouselCard";
import CarouselSkeleton from "./CarouselSkeleton";
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
} from "lucide-react";

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
  const carouselData = flatMarketRes(data?.pages);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "x",
    loop: false,
    slidesToScroll: 5,
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

  const handleCarouselRender = () => {
    if (isPending) {
      return <CarouselSkeleton pulse />;
    } else if (!data && isError) {
      return <CarouselSkeleton pulse={false} />;
    } else {
      return carouselData?.map((coinData) => (
        <CarouselCard key={coinData.id + "carousel"} coinData={coinData} />
      ));
    }
  };

  return (
    <div className="flex justify-center w-table-xl">
      <div className="flex items-center mr-4 mb-3">
        <button
          className="w-10 h-10 p-2 rounded-full border-2 border-teal-900 hover:bg-teal-900 transition-colors disabled:cursor-not-allowed"
          disabled={!data || !canScrollPrev}
          onClick={scrollPrev}
        >
          <ChevronLeftIcon
            className="w-5 h-5 text-zinc-300"
            strokeWidth="2.5px"
          />
        </button>
      </div>
      <div className="flex justify-center">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex w-[1270px] space-x-4">
            {handleCarouselRender()}
          </div>
        </div>
      </div>
      <div className="flex items-center mb-3 ml-4">
        <button
          className="w-10 h-10 p-2 rounded-full border-2 border-teal-900 hover:bg-teal-900 transition-colors disabled:cursor-not-allowed"
          disabled={!data || !canScrollNext}
          onClick={scrollNext}
        >
          <ChevronRightIcon
            className="w-5 h-5 text-zinc-300"
            strokeWidth="2.5px"
          />
        </button>
      </div>
    </div>
  );
};

export default CarouselHorizontal;
