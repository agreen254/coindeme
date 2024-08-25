import { CustomKeyEvents } from "@/utils/types";

import {
  useDropdownSettersFromId,
  useDropdownUnitFromId,
  useDropdownResetFromId,
} from "./useDropdownStore";

export const useDropdownKeyEvents = (
  id: string,
  dropdownLength: number,
  events: CustomKeyEvents
) => {
  const resetDropdown = useDropdownResetFromId(id);
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
    } else if (e.key === "Escape") {
      resetDropdown();
    }

    // If the user-entered key matches one of the provided callbacks then execute that callback.
    Object.entries(events).forEach(
      ([callbackKey, callback]) => callbackKey === e.key && callback(e)
    );
  };
};
