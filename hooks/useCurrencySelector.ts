import { create } from "zustand";

type CurrencySelectorState = {
  dropdownIsVisible: boolean;
  selectedIndex: number;
  actions: CurrencySelectorAction;
};

type CurrencySelectorAction = {
  setDropdownIsVisible: (
    status: CurrencySelectorState["dropdownIsVisible"]
  ) => void;
  setSelectedIndex: (idx: CurrencySelectorState["selectedIndex"]) => void;
};

const useCurrencySelectorStore = create<CurrencySelectorState>((set) => ({
  selectedIndex: 0,
  dropdownIsVisible: false,

  actions: {
    setSelectedIndex: (idx) => set(() => ({ selectedIndex: idx })),
    setDropdownIsVisible: (status) =>
      set(() => ({ dropdownIsVisible: status })),
  },
}));

export const useCurrencySelectorSelectedIndex = () => {
  return useCurrencySelectorStore((state) => state.selectedIndex);
};
export const useCurrencySelectorDropdownIsVisible = () => {
  return useCurrencySelectorStore((state) => state.dropdownIsVisible);
};
export const useCurrencySelectorActions = () => {
  return useCurrencySelectorStore((state) => state.actions);
};
