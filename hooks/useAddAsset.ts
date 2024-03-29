import { Currency } from "@/utils/types";
import { create } from "zustand";

type AddAssetState = {
  amount: number | undefined;
  amountCurrency: Currency;
  coinId: string;
  hasFocus: boolean;

  actions: AddAssetActions;
};

type AddAssetActions = {
  setAmount: (amount: number) => void;
  setAmountCurrency: (currency: Currency) => void;
  setCoinId: (id: string) => void;
  setFocus: (status: boolean) => void;
};

const useAddAssetStore = create<AddAssetState>((set) => ({
  amount: undefined,
  amountCurrency: "usd",
  coinId: "",
  hasFocus: false,

  actions: {
    setAmount: (amount) => set(() => ({ amount: amount })),
    setAmountCurrency: (currency) => set(() => ({ amountCurrency: currency })),
    setCoinId: (id) => set(() => ({ coinId: id })),
    setFocus: (status) => set((state) => ({ hasFocus: status })),
  },
}));

export const useAddAssetAmount = () => {
  return useAddAssetStore((state) => state.amount);
};
export const useAddAssetAmountCurrency = () => {
  return useAddAssetStore((state) => state.amountCurrency);
};
export const useAddAssetCoinId = () => {
  return useAddAssetStore((state) => state.coinId);
};
export const useAddAssetHasFocus = () => {
  return useAddAssetStore((state) => state.hasFocus);
};

export const useAddAssetActions = () => {
  return useAddAssetStore((state) => state.actions);
};
