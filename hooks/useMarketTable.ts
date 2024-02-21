import type { MarketTableSortField, MarketTableMode } from "@/utils/types";

import { create } from "zustand";

type MarketTableState = {
  currentPage: number;
  numFetchedPages: number;

  marketMode: MarketTableMode;
  sortOrder: "asc" | "desc";
  sortField: MarketTableSortField;

  actions: MarketTableAction;
};

type MarketTableAction = {
  setCurrentPage: (page: MarketTableState["currentPage"]) => void;
  setNumFetchedPages: (n: MarketTableState["numFetchedPages"]) => void;

  setMarketTableMode: (mode: MarketTableState["marketMode"]) => void;
  setPageSortOrder: (order: MarketTableState["sortOrder"]) => void;
  setPageSortField: (schema: MarketTableState["sortField"]) => void;
};

const useMarketTableStore = create<MarketTableState>((set) => ({
  currentPage: 0,
  numFetchedPages: 0,

  marketMode: "paginated",
  sortOrder: "desc",
  sortField: "market_cap",

  actions: {
    setCurrentPage: (page) => set(() => ({ currentPage: page })),
    setNumFetchedPages: (n) => set(() => ({ numFetchedPages: n })),

    setMarketTableMode: (mode) => set(() => ({ marketMode: mode })),
    setPageSortField: (schema) => set(() => ({ sortField: schema })),
    setPageSortOrder: (order) => set(() => ({ sortOrder: order })),
  },
}));

/**
 * Export fields individually to avoid subscribing to the entire store.
 * Subscribing to the the entire store will trigger a re-render for every change,
 * even ones the component does not need to know about.
 *
 * e.g. I have a component above the market table that only relies on the current page.
 * If I subscribe to the entire store, this component will be re-rendered whenever the table mode
 * is changed despite not depending on that property.
 *
 * Actions are static and can be exported in a single bundle without impacting performance.
 *
 * https://tkdodo.eu/blog/working-with-zustand
 */
export const useMarketTableCurrentPage = () => {
  return useMarketTableStore((state) => state.currentPage);
};
export const useMarketTableNumFetchedPages = () => {
  return useMarketTableStore((state) => state.numFetchedPages);
};
export const useMarketTableMode = () => {
  return useMarketTableStore((state) => state.marketMode);
};
export const useMarketTableSortField = () => {
  return useMarketTableStore((state) => state.sortField);
};
export const useMarketTableSortOrder = () => {
  return useMarketTableStore((state) => state.sortOrder);
};

export const useMarketTableActions = () => {
  return useMarketTableStore((state) => state.actions);
};
