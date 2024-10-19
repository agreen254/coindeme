"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

import useEmblaCarousel from "embla-carousel-react";
import { useCoinInfoQuery } from "@/hooks/useCoinInfoQuery";

type Props = {
  response: ReturnType<typeof useCoinInfoQuery>;
};

const CoinOverviewCategoriesCarousel = ({ response }: Props) => {
  const categories = response.data?.categories;

  // response object may just have no categories
  const hasCategories = categories && categories.length > 0;

  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    AutoScroll({
      playOnInit: true,
      speed: 0.8,
      startDelay: 0,
      stopOnFocusIn: false,
      stopOnInteraction: false,
    }),
  ]);

  // The carousel needs to be a minimum of twice the width of its parent div or it will not loop.
  // As a safeguard, expand the categories array until it's big enough that we don't have to worry about the total width.
  const minSafeLength = 30;
  const expandedCategories = (() => {
    if (!categories) return [];

    const result = categories;
    while (result.length < minSafeLength) {
      result.push(...categories);
    }
    return result;
  })();

  return hasCategories ? (
    <AnimatePresence>
      <motion.div
        key="categoriesCarousel"
        initial={{ opacity: 0 }}
        animate={{ opacity: 100 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeIn", duration: 1.0 }}
        className="max-w-full h-5 screen-md:h-10"
      >
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {expandedCategories.map((cat, idx) => (
              <div
                key={cat + idx}
                className="flex-[0_0_auto] max-w-full pl-12 min-w-0 h-8 text-sm screen-md:text-lg text-muted-foreground font-light"
              >
                {cat}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  ) : (
    <div className="h-10"></div>
  );
};

export default CoinOverviewCategoriesCarousel;
