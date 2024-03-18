import { create } from "zustand";

type SearchBarState = {
  isUsingMouse: boolean;
  menuIsVisible: boolean;
  menuSelectedIndex: number;
  query: string;
  actions: SearchBarAction;
};

type SearchBarAction = {
  setIsUsingMouse: (status: SearchBarState["isUsingMouse"]) => void;
  setMenuIsVisible: (status: SearchBarState["menuIsVisible"]) => void;
  setMenuSelectedIndex: (index: SearchBarState["menuSelectedIndex"]) => void;
  setQuery: (query: SearchBarState["query"]) => void;
};

const useSearchBarStore = create<SearchBarState>((set) => ({
  menuIsVisible: false,
  menuSelectedIndex: -1,
  isUsingMouse: true,
  query: "",

  actions: {
    setIsUsingMouse: (status) => set(() => ({ isUsingMouse: status })),
    setMenuIsVisible: (status) => set(() => ({ menuIsVisible: status })),
    setMenuSelectedIndex: (index) => set(() => ({ menuSelectedIndex: index })),
    setQuery: (query) => set(() => ({ query: query })),
  },
}));

export const useSearchBarQuery = () => {
  return useSearchBarStore((state) => state.query);
};
export const useSearchBarIsUsingMouse = () => {
  return useSearchBarStore((state) => state.isUsingMouse);
};
export const useSearchMenuIsVisible = () => {
  return useSearchBarStore((state) => state.menuIsVisible);
};
export const useSearchMenuSelectedIndex = () => {
  return useSearchBarStore((state) => state.menuSelectedIndex);
};
export const useSearchBarActions = () => {
  return useSearchBarStore((state) => state.actions);
};

export const useClearBarAndMenu = () => {
  const { setMenuIsVisible, setMenuSelectedIndex, setQuery } =
    useSearchBarActions();

  return () => {
    setQuery("");
    setMenuSelectedIndex(-1);
    setMenuIsVisible(false);
  };
};
