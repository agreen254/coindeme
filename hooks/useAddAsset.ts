import type { Currency } from "@/utils/types";

import { addAsset } from "@/utils/addAsset";
import { create } from "zustand";

type AddAssetState = {
  amount: number;
  amountCurrency: Currency;
  coinId: string;
  date: string;
  modalIsOpen: boolean;

  actions: AddAssetActions;
};

type AddAssetActions = {
  setAmount: (amount: number) => void;
  setAmountCurrency: (currency: Currency) => void;
  setCoinId: (id: string) => void;
  setDate: (date: string) => void;
  setModalIsOpen: (status: boolean) => void;
};

const useAddAssetStore = create<AddAssetState>((set) => ({
  amount: 0,
  amountCurrency: "usd",
  coinId: "",
  date: "",
  modalIsOpen: false,

  actions: {
    setAmount: (amount) => set(() => ({ amount: amount })),
    setAmountCurrency: (currency) => set(() => ({ amountCurrency: currency })),
    setCoinId: (id) => set(() => ({ coinId: id })),
    setDate: (date) => set(() => ({ date: date })),
    setModalIsOpen: (status) => set(() => ({ modalIsOpen: status })),
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
export const useAddAssetModalIsOpen = () => {
  return useAddAssetStore((state) => state.modalIsOpen);
};

export const useAddAssetActions = () => {
  return useAddAssetStore((state) => state.actions);
};
export const useRetrieveAsset = () => {
  return useAddAssetStore((state) => ({
    amount: Number.isNaN(state.amount) ? 0 : state.amount,
    amountCurrency: state.amountCurrency,
    id: state.coinId,
    date: new Date(state.date),
  }));
};
export const useAddAsset = () => {
  const exitModal = () =>
    useAddAssetStore.setState((state) => ({
      ...state,
      modalIsOpen: false,
      coinId: "",
      amount: 0,
    }));
  const asset = useRetrieveAsset();

  return () => {
    const added = addAsset(asset);
    if (added) exitModal();
  };
};
