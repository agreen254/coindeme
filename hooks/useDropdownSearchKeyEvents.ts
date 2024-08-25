import { CustomKeyEvents, SearchResultWrapper } from "@/utils/types";
import {
  useDropdownResetFromId,
  useDropdownUnitFromId,
} from "./useDropdownStore";
import { useDropdownKeyEvents } from "./useDropdownKeyEvents";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const useSearchDropdownKeyEvents = (
  id: string,
  searchResults: SearchResultWrapper[],
  setQuery: (_q: string) => void,
  router: AppRouterInstance
) => {
  const { selectedIndex } = useDropdownUnitFromId(id);
  const resetDropdown = useDropdownResetFromId(id);
  const length = searchResults.length;

  const reset = () => {
    resetDropdown();
    setQuery("");
  };

  const customEvents: CustomKeyEvents = {
    Enter: (e) => {
      e.preventDefault();
      if (length > 0 && length > selectedIndex) {
        router.push(
          selectedIndex === -1
            ? `/coin/${searchResults[0].id}`
            : `/coin/${searchResults[selectedIndex].id}`
        );
        reset();
      }
    },
    Escape: (_) => {
      reset();
    },
  };

  return useDropdownKeyEvents(id, length, customEvents);
};
