import type { SearchTargets } from "@/utils/types";

import { create } from "zustand";

type SearchTargetsState = {
  targets: SearchTargets;
  actions: SearchTargetsAction;
};

type SearchTargetsAction = {
  setTargets: (targets: SearchTargetsState["targets"]) => void;
};

const useSearchTargetsStore = create<SearchTargetsState>((set) => ({
  targets: [],
  actions: {
    setTargets: (targets) => set(() => ({ targets: targets })),
  },
}));

export const useSearchTargets = () => {
  return useSearchTargetsStore((state) => state.targets);
};
export const useSearchTargetsActions = () => {
  return useSearchTargetsStore((state) => state.actions);
};
