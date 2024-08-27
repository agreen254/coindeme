import { CustomKeyHandlers } from "@/utils/types";

import {
  useDropdownSettersFromId,
  useDropdownUnitFromId,
} from "./useDropdownStore";

export const useDropdownKeyEvents = (
  id: string,
  dropdownLength: number,
  events: CustomKeyHandlers
) => {
  const { selectedIndex } = useDropdownUnitFromId(id);
  const { setIsUsingMouse, setSelectedIndex } = useDropdownSettersFromId(id);

  return function (e: React.KeyboardEvent) {
    if (e.key === "ArrowUp") {
      // stop the default event of jumping to the front/back of input text
      e.preventDefault();
      setIsUsingMouse(false);
      setSelectedIndex(
        selectedIndex > 0 ? selectedIndex - 1 : dropdownLength - 1
      );
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIsUsingMouse(false);
      setSelectedIndex(
        selectedIndex < dropdownLength - 1 ? selectedIndex + 1 : 0
      );
    }

    // If there is a custom key event in passed `events` prop that matches the current
    // key, invoke the callback.
    events[e.key]?.(e);
  };
};
