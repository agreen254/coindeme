import { create } from "zustand";
import { AnalysisDataMode, AnalysisScale, AnalysisSeries } from "@/utils/types";

type AnalysisState = {
  dataMode: AnalysisDataMode;
  scale: AnalysisScale;
  series: AnalysisSeries[];
  timeLength: number;

  actions: AnalysisActions;
};

type AnalysisActions = {
  setDataMode: (mode: AnalysisState["dataMode"]) => void;
  setScale: (scale: AnalysisState["scale"]) => void;
  setTimeLength: (length: AnalysisState["timeLength"]) => void;

  setSeriesAxisById: (id: string, axis: AnalysisSeries["axis"]) => void;
  setSeriesNameById: (id: string, name: AnalysisSeries["name"]) => void;
  removeSeriesById: (id: string) => void;
  addSeries: (series: AnalysisSeries) => void;
};

const initSeries: AnalysisSeries[] = [
  {
    axis: "left",
    id: "bitcoin",
    name: "Bitcoin",
  },
  {
    axis: "right",
    id: "ethereum",
    name: "Ethereum",
  },
];
const initScale: AnalysisScale = "linear";
const initDataMode: AnalysisDataMode = "price";
const initTimeLength = 7;

const useAnalysis = create<AnalysisState>((set) => ({
  scale: initScale,
  dataMode: initDataMode,
  series: initSeries,
  timeLength: initTimeLength,

  actions: {
    setDataMode: (mode) => set(() => ({ dataMode: mode })),
    setScale: (scale) => set(() => ({ scale: scale })),
    setTimeLength: (length) => set(() => ({ timeLength: length })),

    setSeriesAxisById: (id, axis) =>
      set((state) => ({
        series: state.series.map((s) =>
          s.id === id ? { ...s, axis: axis } : s
        ),
      })),
    setSeriesNameById: (id, name) =>
      set((state) => ({
        series: state.series.map((s) =>
          s.id === id ? { ...s, name: name } : s
        ),
      })),
    removeSeriesById: (id) =>
      set((state) => ({ series: state.series.filter((s) => s.id !== id) })),
    addSeries: (series) =>
      set((state) => ({ series: [...state.series, series] })),
  },
}));

export const useAnalysisScale = () => {
  return useAnalysis((state) => state.scale);
};
export const useAnalysisDataMode = () => {
  return useAnalysis((state) => state.dataMode);
};
export const useAnalysisSeries = () => {
  return useAnalysis((state) => state.series);
};
export const useAnalysisTimeLength = () => {
  return useAnalysis((state) => state.timeLength);
};

export const useAnalysisActions = () => {
  return useAnalysis((state) => state.actions);
};
