import { create } from "zustand";

type ComparisonChartTimeState = {
  time: string;
  actions: ComparisonChartTimeAction;
};

type ComparisonChartTimeAction = {
  handleSelect: (time: string) => void;
};

const useComparisonChartTimeStore = create<ComparisonChartTimeState>((set) => ({
  time: "7",
  actions: {
    handleSelect: (time) => set(() => ({ time: time })),
  },
}));

export const useComparisonChartTime = () => {
  return useComparisonChartTimeStore((state) => state.time);
};
export const useComparisonChartTimeActions = () => {
  return useComparisonChartTimeStore((state) => state.actions);
};

// helpers
export const useComparisonChartTimeIsSelected = (time: string): boolean => {
  return useComparisonChartTimeStore((state) => state.time) === time;
};
