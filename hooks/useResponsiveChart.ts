import { ChartResponsiveValues } from "@/utils/types";
import {
  chartTooltipFontSizeMap,
  chartTooltipPaddingSizeMap,
  chartTitleFontSizeMap,
  chartTickFontSizeMap,
  chartLineThicknessMap,
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
    tooltipFontSize: chartTooltipFontSizeMap.get(screenSize)!,
    tooltipPaddingSize: chartTooltipPaddingSizeMap.get(screenSize)!,
    titleFontSize: chartTitleFontSizeMap.get(screenSize)!,
    tickFontSize: chartTickFontSizeMap.get(screenSize)!,
    lineThickness: chartLineThicknessMap.get(screenSize)!,
  };
};
