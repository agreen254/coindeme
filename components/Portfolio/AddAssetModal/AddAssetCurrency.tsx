import { cn } from "@/utils/cn";
import { currencyEntries } from "@/utils/maps";
import { forwardRef, type ForwardedRef } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import { useDropdownStore } from "@/hooks/useDropdownStore";

import { ChevronDown as ChevronDownIcon } from "lucide-react";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import DropdownMenuItem from "@/components/Dropdown/DropdownMenuItem";

type Props = {
  amount: number | undefined;
  setAmount: (_amount: number) => void;
};

const AddAssetCurrency = forwardRef(
  ({ amount, setAmount }: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const { isVisible, setIsVisible, selectedIndex, setSelectedIndex } =
      useDropdownStore((store) => store);

    const clickAwayRef: React.MutableRefObject<HTMLInputElement> = useClickAway(
      () => {
        setIsVisible(false);
      }
    );

    return (
      <div className="w-full relative">
        <input
          type="tel"
          ref={clickAwayRef}
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.currentTarget.value) || 0)}
          className="h-11 pl-2 w-full rounded-lg bg-zinc-800/60"
          placeholder="Purchased amount"
        />
        <button
          className="absolute right-2 top-2"
          onClick={() => setIsVisible(!isVisible)}
        >
          <span>USD</span>
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
          ref={ref}
          key="addCurrency"
          className="absolute w-[72px] top-10 right-[2px] rounded-md bg-dropdown border border-stone-300"
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
                onClick={() => clickAwayRef.current.focus()}
              >
                <span className="font-semibold mr-2 ">{entry[1]}</span>
                <span>{entry[0].toUpperCase()}</span>
              </button>
            </DropdownMenuItem>
          ))}
        </DropdownMenu>
      </div>
    );
  }
);

export default AddAssetCurrency;

AddAssetCurrency.displayName = "AddAssetCurrency";
