import { ChartResponsiveValues } from "@/utils/types";
import {
  tooltipFontSizeMap,
  tooltipPaddingSizeMap,
  chartTitleFontSizeMap,
} from "@/utils/maps";
import { useScreenSize } from "./useScreenSize";

/**
 * Make sure the font sizes and padding of charts is appropriate
 * for the client's screen size.
 */
export const useResponsiveChart = (): ChartResponsiveValues => {
  // hook falls back to a default screen size so each map.get will be defined
  const screenSize = useScreenSize();

  return {
    tooltipFontSize: tooltipFontSizeMap.get(screenSize)!,
    tooltipPaddingSize: tooltipPaddingSizeMap.get(screenSize)!,
    titleFontSize: chartTitleFontSizeMap.get(screenSize)!,
  };
};
