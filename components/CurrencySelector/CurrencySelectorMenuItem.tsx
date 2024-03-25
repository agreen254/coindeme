import type { Currency } from "@/utils/types";

import { cn } from "@/utils/cn";
import { useDropdownContext } from "@/hooks/useDropdown";
import {
  useUserCurrencySetting,
  useUserSetCurrency as setCurrency,
} from "@/hooks/useUserSettings";
import { currencyMap } from "@/utils/maps";

type Props = {
  entry: [Currency, string];
  index: number;
};

const CurrencySelectorMenuItem = ({ entry, index }: Props) => {
  const currency = useUserCurrencySetting();
  const currencyEntries = Array.from(currencyMap.entries());

  const [selectedIndex, setSelectedIndex] = [
    useDropdownContext((s) => s.menuSelectedIndex),
    useDropdownContext((s) => s.setMenuSelectedIndex),
  ];
  const setIsVisible = useDropdownContext((s) => s.setMenuIsVisible);

  return (
    <button
      key={entry[0] + "selector"}
      className={cn(
        "w-full text-left indent-3 py-1 block first:rounded-t-md last:rounded-b-md",
        currency === entry[0] && "text-menu-highlight",
        index === selectedIndex && "bg-zinc-600 text-inherit"
      )}
      onClick={() => {
        setCurrency(currencyEntries[selectedIndex][0]);
        setIsVisible(false);
      }}
      onMouseEnter={() => {
        setSelectedIndex(index);
      }}
    >
      <span className="font-semibold mr-2 ">{entry[1]}</span>
      <span>{entry[0].toUpperCase()}</span>
    </button>
  );
};

export default CurrencySelectorMenuItem;
