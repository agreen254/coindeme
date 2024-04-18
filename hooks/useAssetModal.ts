import type { Currency } from "@/utils/types";

import { create } from "zustand";
// import { useUserCurrencySetting } from "./useUserSettings";

type AssetModalState = {
  assetId: string;
  coinId: string;
  coinQuery: string;
  date: string;
  value: string;
  valueCurrency: Currency;

  actions: AssetModalActions;
};

type AssetModalActions = {
  setAssetId: (id: AssetModalState["assetId"]) => void;
  setCoinId: (id: AssetModalState["coinId"]) => void;
  setCoinQuery: (query: AssetModalState["coinQuery"]) => void;
  setDate: (date: AssetModalState["date"]) => void;
  setValue: (value: AssetModalState["value"]) => void;
  setValueCurrency: (currency: AssetModalState["valueCurrency"]) => void;
};

export const defaultAssetModalProps: Omit<AssetModalState, "actions"> = {
  assetId: "",
  coinId: "",
  coinQuery: "",
  date: "",
  value: "",
  valueCurrency: "usd",
};

const useAssetModalStore = create<AssetModalState>((set) => {
  //   const currency = useUserCurrencySetting();

  return {
    ...defaultAssetModalProps,
    actions: {
      setAssetId: (id) => set(() => ({ assetId: id })),
      setCoinId: (id) => set(() => ({ coinId: id })),
      setCoinQuery: (query) => set(() => ({ coinQuery: query })),
      setDate: (date) => set(() => ({ date: date })),
      setValue: (value) => set(() => ({ value: value })),
      setValueCurrency: (currency) => set(() => ({ valueCurrency: currency })),
    },
  };
});

export const useAssetModalAssetId = () => {
  return useAssetModalStore().assetId;
};
export const useAssetModalCoinId = () => {
  return useAssetModalStore().coinId;
};
export const useAssetModalCoinQuery = () => {
  return useAssetModalStore().coinQuery;
};
export const useAssetModalDate = () => {
  return useAssetModalStore().date;
};
export const useAssetModalValue = () => {
  return useAssetModalStore().value;
};
export const useAssetModalValueCurrency = () => {
  return useAssetModalStore().valueCurrency;
};

export const useAssetModalActions = () => {
  return useAssetModalStore().actions;
};
export const useAssetModalDefault = () => {
  return () =>
    useAssetModalStore.setState({
      ...defaultAssetModalProps,
    });
};
export const useAssetModalInjectData = (data: Partial<AssetModalState>) => {
  const store = useAssetModalStore;
  return () =>
    store.setState({ ...defaultAssetModalProps, ...data });
};
