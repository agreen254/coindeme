import { Dispatch, SetStateAction } from "react";
import { CustomKeyHandlers } from "@/utils/types";
import {
  useDropdownResetFromId,
  useDropdownUnitFromId,
} from "./useDropdownStore";
import { useDropdownKeyEvents } from "./useDropdownKeyEvents";

export const useDropdownAnalysisKeyEvents = (
  dropdownId: string,
  length: number,
  currentCoinName: string,
  newCoinName: string,
  newCoinId: string,
  setQuery: Dispatch<SetStateAction<string>>
) => {
  const { isVisible, selectedIndex } = useDropdownUnitFromId(dropdownId);
  const reset = useDropdownResetFromId(dropdownId);
  const customEvents: CustomKeyHandlers = {
    Enter: (e) => {
      e.preventDefault();
      if (isVisible && length > 0 && length > selectedIndex) {
      }
      reset();
    },
    Escape: (e) => {
      setQuery(currentCoinName);
    },
    Tab: (e) => {
      setQuery(currentCoinName);
      if (isVisible) e.preventDefault();
    },
  };

  return useDropdownKeyEvents(dropdownId, length, customEvents);
};
