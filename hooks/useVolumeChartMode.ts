import { create } from "zustand";

type VolumeChartModeState = {
  mode: "stack" | "overlap";
  actions: VolumeChartModeAction;
};

type VolumeChartModeAction = {
  changeMode: (mode: VolumeChartModeState["mode"]) => void;
};

const useVolumeChartModeStore = create<VolumeChartModeState>((set) => ({
  mode: "overlap",
  actions: {
    changeMode: (mode) => set(() => ({ mode: mode })),
  },
}));

export const useVolumeChartMode = () => {
  return useVolumeChartModeStore((state) => state.mode);
};
export const useVolumeChartModeIsSelected = (
  mode: VolumeChartModeState["mode"]
) => {
  return useVolumeChartModeStore((state) => state.mode === mode);
};
export const useVolumeChartActions = () => {
  return useVolumeChartModeStore((state) => state.actions);
};
