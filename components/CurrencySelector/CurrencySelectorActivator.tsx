import { ChevronDown as ChevronIcon } from "lucide-react";

import CoinsIcon from "@/Icons/Coins";
import { cn } from "@/utils/cn";
import { currencyMap } from "@/utils/maps";
import {
  useUserCurrencySetting,
  useUserSetCurrency as setCurrency,
} from "@/hooks/useUserSettings";
import { CustomKeyHandlers } from "@/utils/types";
import {
  useDropdownResetFromId,
  useDropdownSettersFromId,
  useDropdownUnitFromId,
} from "@/hooks/useDropdownStore";
import { useDropdownKeyEvents } from "@/hooks/useDropdownKeyEvents";

type Props = {
  dropdownId: string;
};

const CurrencySelectorActivator = ({ dropdownId }: Props) => {
  const currency = useUserCurrencySetting();
  const currencyEntries = Array.from(currencyMap.entries());
  const numEntries = currencyEntries.length;

  const { isVisible, selectedIndex } = useDropdownUnitFromId(dropdownId);
  const { setIsVisible } = useDropdownSettersFromId(dropdownId);
  const reset = useDropdownResetFromId(dropdownId);

  const customKeyHandlers: CustomKeyHandlers = {
    Enter: (e) => {
      e.preventDefault();
      if (!isVisible) setIsVisible(true);
      else if (selectedIndex >= 0) {
        setCurrency(currencyEntries[selectedIndex][0]);
        reset();
      } else reset();
    },
    Escape: (_) => reset(),
    Tab: (_) => reset(),
  };

  const handleKeyDown = useDropdownKeyEvents(
    dropdownId,
    numEntries,
    customKeyHandlers
  );

  const handleClick = () => setIsVisible(!isVisible);

  return (
    <button
      className="h-[42px] w-auto screen-sm:w-[108px] px-4 screen-sm:px-0 text-sm screen-sm:text-base rounded-md flex justify-evenly items-center dark:bg-white/10 focus:outline-none focus:ring-[1px] focus:ring-black/50 dark:focus:ring-white/50 shadow-top shadow-zinc-500/60 disabled:cursor-not-allowed"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <CoinsIcon className="hidden screen-sm:inline w-6 h-6 ml-2 mr-2 fill-default" />
      {currency.toUpperCase()}
      <ChevronIcon
        className={cn(
          "w-4 h-4 screen-sm:mr-2 inline transition-all",
          isVisible && "rotate-180"
        )}
      />
    </button>
  );
};

export default CurrencySelectorActivator;
