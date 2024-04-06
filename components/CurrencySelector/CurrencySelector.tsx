"use client";

import { cn } from "@/utils/cn";
import { currencyEntries } from "@/utils/maps";
import { useClickAway } from "@uidotdev/usehooks";
import {
  useDropdownSettersFromId,
  useDropdownUnitFromId,
  useDropdownResetFromId,
} from "@/hooks/useDropdownStore";
import { useEffect } from "react";
import {
  useUserCurrencySetting,
  useUserSetCurrency,
} from "@/hooks/useUserSettings";

import CurrencySelectorActivator from "./CurrencySelectorActivator";
import DropdownMenu from "../Dropdown/DropdownMenu";
import DropdownMenuItem from "../Dropdown/DropdownMenuItem";

type Props = {
  dropdownId: string;
};

const CurrencySelector = ({ dropdownId }: Props) => {
  const currency = useUserCurrencySetting();
  const transitionLength = 0.2; // seconds

  const setCurrency = useUserSetCurrency;
  const reset = useDropdownResetFromId(dropdownId);

  const { isVisible, selectedIndex } = useDropdownUnitFromId(dropdownId);
  const { setIsVisible, setSelectedIndex } =
    useDropdownSettersFromId(dropdownId);

  // prevent items being selected while the fadeout animation is playing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isVisible) setSelectedIndex(-1);
    }, transitionLength * 1000);
    return () => clearTimeout(timer);
  }, [isVisible, setSelectedIndex]);

  const clickAwayRef: React.MutableRefObject<HTMLDivElement> = useClickAway(
    () => {
      reset();
    }
  );

  return (
    <div className="relative" ref={clickAwayRef}>
      <CurrencySelectorActivator dropdownId={dropdownId} />
      <DropdownMenu
        dropdownId={dropdownId}
        key="currencyDropdown"
        className="w-[108px] absolute top-[52px] z-10 rounded-md text-zinc-200 border border-stone-300 bg-dropdown"
      >
        {currencyEntries.map((entry, index) => (
          <DropdownMenuItem
            dropdownId={dropdownId}
            key={entry[0] + "selector"}
            index={index}
            className={cn(
              currency === entry[0] && "text-menu-highlight",
              index === selectedIndex &&
                "bg-zinc-600 first:rounded-t-md last:rounded-b-md text-inherit"
            )}
          >
            <button
              tabIndex={-1}
              className="w-full text-left indent-3 py-1 block"
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
          </DropdownMenuItem>
        ))}
      </DropdownMenu>
    </div>
  );
};

export default CurrencySelector;
