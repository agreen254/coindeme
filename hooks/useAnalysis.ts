import { create } from "zustand";
import { AnalysisDataMode, AnalysisSeries, AnalysisView } from "@/utils/types";

type AnalysisState = {
  decimationThreshold: number;
  dataMode: AnalysisDataMode;
  series: AnalysisSeries[];
  timeLength: number;
  view: AnalysisView;

  actions: AnalysisActions;
};

type AnalysisActions = {
  setDecimationThreshold: (threshol: number) => void;
  setDataMode: (mode: AnalysisState["dataMode"]) => void;
  setTimeLength: (length: AnalysisState["timeLength"]) => void;
  setView: (view: AnalysisState["view"]) => void;

  setSeriesAxisById: (id: string, axis: AnalysisSeries["axis"]) => void;
  removeSeriesById: (id: string) => void;
  addSeries: (series: AnalysisSeries) => void;
  updateSeries: (index: number, id: string, name: string) => void;
};

export const emptySeries: AnalysisSeries = {
  axis: "left",
  id: "",
  name: "",
};

const initDecimationThreshold = Infinity;
const initDataMode: AnalysisDataMode = "Price";
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
const initTimeLength = 7;

const useAnalysis = create<AnalysisState>((set) => ({
  decimationThreshold: initDecimationThreshold,
  dataMode: initDataMode,
  series: initSeries,
  timeLength: initTimeLength,
  view: "Linear",

  actions: {
    setDecimationThreshold: (threshold) =>
      set(() => ({ decimationThreshold: threshold })),
    setDataMode: (mode) => set(() => ({ dataMode: mode })),
    setTimeLength: (length) => set(() => ({ timeLength: length })),
    setView: (view) => set(() => ({ view: view })),

    setSeriesAxisById: (id, axis) =>
      set((state) => ({
        series: state.series.map((s) =>
          s.id === id ? { ...s, axis: axis } : s
        ),
      })),
    removeSeriesById: (id) =>
      set((state) => ({ series: state.series.filter((s) => s.id !== id) })),
    addSeries: (series) =>
      set((state) => ({ series: [...state.series, series] })),
    updateSeries: (index, id, name) =>
      set((state) => ({
        series: state.series.map((s, i) =>
          i === index ? { id, name, axis: s.axis } : s
        ),
      })),
  },
}));

export const useAnalysisDecimationThreshold = () => {
  return useAnalysis((state) => state.decimationThreshold);
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
export const useAnalysisView = () => {
  return useAnalysis((state) => state.view);
};

export const useAnalysisActions = () => {
  return useAnalysis((state) => state.actions);
};
