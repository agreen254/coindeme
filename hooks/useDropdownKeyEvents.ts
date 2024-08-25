import { CustomKeyEvents } from "@/utils/types";

import {
  useDropdownSettersFromId,
  useDropdownUnitFromId,
} from "./useDropdownStore";

export const useDropdownKeyEvents = (
  id: string,
  dropdownLength: number,
  events: CustomKeyEvents
) => {
  const { selectedIndex } = useDropdownUnitFromId(id);
  const { setIsUsingMouse, setSelectedIndex } = useDropdownSettersFromId(id);

  return function (e: React.KeyboardEvent<HTMLInputElement>) {
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

    // If the user-entered key matches one of the provided callbacks then execute that callback.
    events[e.key]?.(e);
  };
};
