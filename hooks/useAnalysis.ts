import { create } from "zustand";
import type { SearchItem } from "@/utils/types";

type AnalysisState = {
  coins: SearchItem[];
  coinAxes: ("left" | "right" | "")[];
  decimationThreshold: number;
  yScale: "linear" | "logarithmic";

  actions: AnalysisActions;
};

type AnalysisActions = {
  setCoin: (coin: SearchItem, idx: number) => void;
  setCoinAxisPosition: (
    newPosition: AnalysisState["coinAxes"][number],
    newIdx: number
  ) => void;
  setDecimationThreshold: (t: number) => void;
  setYScale: (scale: AnalysisState["yScale"]) => void;
};

const useAnalysisStore = create<AnalysisState>((set) => ({
  coins: [
    { name: "Bitcoin", symbol: "BTC", id: "bitcoin" },
    { name: "Ethereum", symbol: "ETH", id: "ethereum" },
    { name: "", symbol: "", id: "" },
  ],
  coinAxes: ["left", "right", ""],
  decimationThreshold: Infinity,
  yScale: "linear",

  actions: {
    setCoin: (coin, idx) =>
      set((state) => {
        if (idx > state.coins.length) return { coins: state.coins };
        return {
          coins: state.coins.map((currentId, i) =>
            idx === i ? coin : currentId
          ),
        };
      }),
    setCoinAxisPosition: (position, idx) =>
      set((state) => {
        if (idx > state.coinAxes.length) return { coinAxes: state.coinAxes };
        return {
          coinAxes: state.coinAxes.map((p, i) => (idx === i ? position : p)),
        };
      }),
    setDecimationThreshold: (t) => set((_) => ({ decimationThreshold: t })),
    setYScale: (scale) => set((_) => ({ yScale: scale })),
  },
}));

export const useAnalysisCoins = () => {
  return useAnalysisStore().coins;
};
export const useAnalysisCoinAxes = () => {
  return useAnalysisStore().coinAxes;
};
export const useAnalysisDecimationThreshold = () => {
  return useAnalysisStore().decimationThreshold;
};
export const useAnalysisYScale = () => {
  return useAnalysisStore().yScale;
};

export const useAnalysisActions = () => {
  return useAnalysisStore().actions;
};
