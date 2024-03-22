"use client";

import { currencyMap } from "@/utils/maps";
import { useClickAway } from "@uidotdev/usehooks";
import { useDropdownContext } from "@/hooks/useDropdown";
import { useEffect } from "react";

import CurrencySelectorActivator from "./CurrencySelectorActivator";
import CurrencySelectorMenu from "./CurrencySelectorMenu";
import CurrencySelectorMenuItem from "./CurrencySelectorMenuItem";

const CurrencySelector = () => {
  const currencyEntries = Array.from(currencyMap.entries());
  const transitionLength = 0.2; // seconds

  const [isVisible, setIsVisible] = [
    useDropdownContext((s) => s.menuIsVisible),
    useDropdownContext((s) => s.setMenuIsVisible),
  ];
  const setSelectedIndex = useDropdownContext((s) => s.setMenuSelectedIndex);

  // prevent items being selected while the fadeout animation is playing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isVisible) setSelectedIndex(-1);
    }, transitionLength * 1000);
    return () => clearTimeout(timer);
  }, [isVisible, setSelectedIndex]);

  const clickAwayRef: React.MutableRefObject<HTMLDivElement> = useClickAway(
    () => {
      setIsVisible(false);
    }
  );

  return (
    <div className="relative" ref={clickAwayRef}>
      <CurrencySelectorActivator />
      <CurrencySelectorMenu transitionLength={transitionLength}>
        {currencyEntries.map((entry, idx) => (
          <CurrencySelectorMenuItem
            key={entry[0] + "selector"}
            entry={entry}
            index={idx}
          />
        ))}
      </CurrencySelectorMenu>
    </div>
  );
};

export default CurrencySelector;
