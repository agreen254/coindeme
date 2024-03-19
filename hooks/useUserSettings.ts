import type { Currency } from "@/utils/types";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserSettingsState = {
  currency: Currency;
  actions: UserSettingsAction;
};

type UserSettingsAction = {
  setCurrency: (currency: UserSettingsState["currency"]) => void;
};

const useUserSettingsStore = create<UserSettingsState>()(
  persist(
    (set) => ({
      currency: "usd",
      actions: {
        setCurrency: (currency) => () => set({ currency: currency }),
      },
    }),
    {
      name: "crypto-user-settings",
    }
  )
);

export const useUserCurrencySetting = () => {
  return useUserSettingsStore((state) => state.currency);
};
