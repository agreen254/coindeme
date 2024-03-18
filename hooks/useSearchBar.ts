import { create } from "zustand";

type SearchBarState = {
  query: string;
  menuIsVisible: boolean;
  menuSelectedIndex: number;
  actions: SearchBarAction;
};

type SearchBarAction = {
  setMenuIsVisible: (status: SearchBarState["menuIsVisible"]) => void;
  setMenuSelectedIndex: (index: SearchBarState["menuSelectedIndex"]) => void;
  setQuery: (query: SearchBarState["query"]) => void;
};

const useSearchBarStore = create<SearchBarState>((set) => ({
  menuIsVisible: false,
  menuSelectedIndex: -1,
  query: "",

  actions: {
    setMenuIsVisible: (status) => set(() => ({ menuIsVisible: status })),
    setMenuSelectedIndex: (index) => set(() => ({ menuSelectedIndex: index })),
    setQuery: (query) => set(() => ({ query: query })),
  },
}));

export const useSearchMenuIsVisible = () => {
  return useSearchBarStore((state) => state.menuIsVisible);
};
export const useSearchBarQuery = () => {
  return useSearchBarStore((state) => state.query);
};
export const useSearchMenuSelectedIndex = () => {
  return useSearchBarStore((state) => state.menuSelectedIndex);
};
export const useSearchBarActions = () => {
  return useSearchBarStore((state) => state.actions);
};
