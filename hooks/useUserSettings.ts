import type { Currency } from "@/utils/types";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserSettingsState = {
  currency: Currency;
};

const useUserSettingsStore = create<UserSettingsState>()(
  persist(
    (_) => ({
      currency: "usd",
    }),
    {
      name: "crypto-user-settings",
    }
  )
);

export const useUserCurrencySetting = () => {
  return useUserSettingsStore((state) => state.currency);
};
export const useUserSetCurrency = (currency: Currency) => {
  useUserSettingsStore.setState({ currency: currency });
};
