import { useState, useEffect } from "react";
import { useWindowSize } from "@uidotdev/usehooks";

/**
 * This custom hook matches the number of carousel slides scrolled to the width of the screen. Some entries will
 * be inaccessible if the number of slides scrolled is greater than the number the carousel can show the user.
 */
export const useNumSlidesToScroll = () => {
  const [slidesToScroll, setSlidesToScroll] = useState<number>(1);
  const { width } = useWindowSize();

  const screenWidthForWidestCarousel = 1500; // px
  const numSlidesForWidest = 6;

  const carouselSlideWidth = 240; // px
  const carouselResponsiveWidth = 0.9; // vw

  useEffect(() => {
    if (!width) setSlidesToScroll(1); // default; always safe to scroll by 1
    else if (width >= screenWidthForWidestCarousel)
      setSlidesToScroll(numSlidesForWidest);
    else
      setSlidesToScroll(
        Math.max(
          // the max() ensures it will never floor to 0
          Math.floor((width * carouselResponsiveWidth) / carouselSlideWidth),
          1
        )
      );
  }, [width]);
  return slidesToScroll;
};
