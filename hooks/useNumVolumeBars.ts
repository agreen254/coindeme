import { useScreenSize } from "./useScreenSize";
import { volumeBarDecimationMap } from "@/utils/maps";

/**
 * Use appropriate number of bars for smaller screens.
 */
export const useNumVolumeBars = () => {
  const screenSize = useScreenSize();
  return volumeBarDecimationMap.get(screenSize)!;
};
