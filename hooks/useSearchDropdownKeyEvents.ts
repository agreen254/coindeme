import { useRouter } from "next/router";
import { CustomKeyEvents, SearchResultWrapper } from "@/utils/types";
import { useDropdownUnitFromId } from "./useDropdownStore";
import { useDropdownKeyEvents } from "./useDropdownKeyEvents";

export const useSearchDropdownKeyEvents = (
  id: string,
  searchResults: SearchResultWrapper[]
) => {
  const { isVisible, selectedIndex } = useDropdownUnitFromId(id);
  const length = searchResults.length;
  const router = useRouter();

  const customEvents: CustomKeyEvents = {
    Enter: (e) => {
      e.preventDefault();
      if (length > 0 && length > selectedIndex) {
        router.push(
          selectedIndex === -1
            ? `/coin/${searchResults[0].id}`
            : `/coin/${searchResults[selectedIndex].id}`
        );
      }
    },
  };

  return useDropdownKeyEvents(id, length, customEvents);
};
