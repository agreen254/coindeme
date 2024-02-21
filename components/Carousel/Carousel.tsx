"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

import CarouselCard from "./CarouselCard";

type Props = {
  coins: string[];
};

const Carousel = ({ coins }: Props) => {
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
    <div>
      <button className="px-3 py-3 rounded-full" onClick={scrollPrev}>
        Previous
      </button>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex flex-col h-48">
          {coins.map((name) => (
            <CarouselCard key={name + "carousel"}>{name}</CarouselCard>
          ))}
        </div>
      </div>
      <button className="px-3 py-3 rounded-full" onClick={scrollNext}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
