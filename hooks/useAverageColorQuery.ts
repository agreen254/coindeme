import { FastAverageColor } from "fast-average-color";
import { useQuery } from "@tanstack/react-query";

export const useAverageColorQuery = (url: string) =>
  useQuery({
    queryKey: ["average", "color", url],
    queryFn: async () => {
      const fac = new FastAverageColor();
      return fac.getColorAsync(url, {
        algorithm: "simple",
        mode: "speed",
        ignoredColor: [0, 0, 0, 255], // ignore black for more striking color
      });
    },
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
