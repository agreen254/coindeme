import { KeyboardEvent } from "react";

import { cn } from "@/utils/cn";
import { currencyEntries, currencyMap } from "@/utils/maps";
import {
  useAddAsset,
  useAddAssetActions,
  useAddAssetAmount,
  useAddAssetAmountCurrency,
} from "@/hooks/useAddAsset";
import { useClickAway } from "@uidotdev/usehooks";
import { useDropdownReset, useDropdownStore } from "@/hooks/useDropdownStore";

import { ChevronDown as ChevronDownIcon } from "lucide-react";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import DropdownMenuItem from "@/components/Dropdown/DropdownMenuItem";

const AddAssetCurrency = () => {
  const amount = useAddAssetAmount();
  const amountCurrency = useAddAssetAmountCurrency();
  const resetDropdown = useDropdownReset();
  const { setAmount, setAmountCurrency } = useAddAssetActions();
  const { isVisible, setIsVisible, selectedIndex, setSelectedIndex } =
    useDropdownStore((store) => store);

  const currencyName =
    selectedIndex === -1 ? "usd" : currencyEntries[selectedIndex][0];

  const clickAwayRef: React.MutableRefObject<HTMLInputElement> = useClickAway(
    () => {
      setSelectedIndex(-1);
      setIsVisible(false);
    }
  );

  const handleAddAsset = useAddAsset();

  const handleKeyDownInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddAsset();
    }
  };

  const handleKeyDownMenu = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(
        selectedIndex <= 0 ? currencyEntries.length - 1 : selectedIndex - 1
      );
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(
        selectedIndex === currencyEntries.length - 1 ? 0 : selectedIndex + 1
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0) {
        setAmountCurrency(currencyName);
      }
      setIsVisible(!isVisible);
      setSelectedIndex(-1);
    }
  };

  return (
    <div
      className="w-full relative flex gap-x-2 justify-between"
      ref={clickAwayRef}
    >
      <span className="absolute left-2 top-[10px]">
        {currencyMap.get(amountCurrency)}
      </span>
      <>
        <label htmlFor="amount" className="sr-only">
          Enter amount purchased
        </label>
        <input
          type="number"
          id="amount"
          autoComplete="off"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.currentTarget.value))}
          onKeyDown={(e) => handleKeyDownInput(e)}
          className="h-11 w-full pl-5 rounded-lg bg-zinc-800/60"
        />
      </>
      <>
        <label htmlFor="assetCurrency" className="sr-only">
          select purchase currency
        </label>
        <button
          id="assetCurrency"
          className={cn(
            "py-2 pr-2 pl-3 min-w-[5rem] rounded-lg bg-zinc-800/60",
            isVisible && "border-2 border-muted-foreground"
          )}
          onKeyDown={(e) => handleKeyDownMenu(e)}
          onClick={() => setIsVisible(!isVisible)}
        >
          <span>{amountCurrency.toUpperCase()}</span>
          <span>
            <ChevronDownIcon
              className={cn(
                "w-4 h-4 ml-1 inline transition-transform",
                isVisible && "rotate-180"
              )}
            />
          </span>
        </button>
        <DropdownMenu
          key="addCurrency"
          className="absolute w-[5rem] top-[52px] right-0 rounded-md bg-dropdown border border-stone-300"
        >
          {currencyEntries.map((entry, idx) => (
            <DropdownMenuItem
              key={entry[0] + "asset"}
              index={idx}
              className={cn(
                selectedIndex === idx &&
                  "bg-zinc-600 first:rounded-t-md last:rounded-b-md"
              )}
            >
              <button
                className="w-full text-center py-1 block"
                onMouseEnter={() => setSelectedIndex(idx)}
                onClick={() => {
                  setAmountCurrency(currencyName);
                  resetDropdown();
                }}
              >
                <span className="font-semibold mr-2 ">{entry[1]}</span>
                <span>{entry[0].toUpperCase()}</span>
              </button>
            </DropdownMenuItem>
          ))}
        </DropdownMenu>
      </>
    </div>
  );
};

export default AddAssetCurrency;
