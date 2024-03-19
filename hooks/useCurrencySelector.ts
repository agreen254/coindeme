import { create } from "zustand";

type CurrencySelectorState = {
  activeCurrencyIndex: number;
  dropdownIsVisible: boolean;
  selectedIndex: number;
  actions: CurrencySelectorAction;
};

type CurrencySelectorAction = {
  setActiveCurrencyIndex: (
    idx: CurrencySelectorState["activeCurrencyIndex"]
  ) => void;
  setDropdownIsVisible: (
    status: CurrencySelectorState["dropdownIsVisible"]
  ) => void;
  setSelectedIndex: (idx: CurrencySelectorState["selectedIndex"]) => void;
};

const useCurrencySelectorStore = create<CurrencySelectorState>((set) => ({
  // activeCurrencyIndex and selectedIndex are two separate properties because
  // the currency shown in the nav button should not change unless the user
  // actually chooses a new one it (either by clicking or using the arrow keys and enter)
  activeCurrencyIndex: 0,
  selectedIndex: 0,

  dropdownIsVisible: false,

  actions: {
    setActiveCurrencyIndex: (idx) => set(() => ({ activeCurrencyIndex: idx })),
    setSelectedIndex: (idx) => set(() => ({ selectedIndex: idx })),
    setDropdownIsVisible: (status) =>
      set(() => ({ dropdownIsVisible: status })),
  },
}));

export const useCurrencySelectorDisplayedIndex = () => {
  return useCurrencySelectorStore((state) => state.activeCurrencyIndex);
};
export const useCurrencySelectorSelectedIndex = () => {
  return useCurrencySelectorStore((state) => state.selectedIndex);
};
export const useCurrencySelectorDropdownIsVisible = () => {
  return useCurrencySelectorStore((state) => state.dropdownIsVisible);
};
export const useCurrencySelectorActions = () => {
  return useCurrencySelectorStore((state) => state.actions);
};
