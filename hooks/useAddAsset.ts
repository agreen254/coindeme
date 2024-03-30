import { Currency } from "@/utils/types";
import { create } from "zustand";

type AddAssetState = {
  amount: number;
  amountCurrency: Currency;
  coinId: string;
  date: string;

  actions: AddAssetActions;
};

type AddAssetActions = {
  setAmount: (amount: number) => void;
  setAmountCurrency: (currency: Currency) => void;
  setCoinId: (id: string) => void;
  setDate: (date: string) => void;
};

const useAddAssetStore = create<AddAssetState>((set) => ({
  amount: 0,
  amountCurrency: "usd",
  coinId: "",
  date: "",

  actions: {
    setAmount: (amount) => set(() => ({ amount: amount })),
    setAmountCurrency: (currency) => set(() => ({ amountCurrency: currency })),
    setCoinId: (id) => set(() => ({ coinId: id })),
    setDate: (date) => set(() => ({ date: date })),
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
export const useAddAssetDate = () => {
  return useAddAssetStore((state) => state.date);
};

export const useAddAssetActions = () => {
  return useAddAssetStore((state) => state.actions);
};
