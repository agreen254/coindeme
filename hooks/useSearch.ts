import { create } from "zustand";

type SearchQueryState = {
  query: string;
  actions: SearchQueryAction;
};

type SearchQueryAction = {
  setQuery: (query: SearchQueryState["query"]) => void;
};

const useSearchQueryStore = create<SearchQueryState>((set) => ({
  query: "",

  actions: {
    setQuery: (query) => set(() => ({ query: query })),
  },
}));

export const useSearchQuery = () => {
  return useSearchQueryStore((state) => state.query);
};
export const useSearchQueryActions = () => {
  return useSearchQueryStore((state) => state.actions);
};
