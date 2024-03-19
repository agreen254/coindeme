import type { Currency } from "@/utils/types";

import { cn } from "@/utils/cn";

type Props = {
  entry: [Currency, string];
  index: number;
};

const CurrencySelectorDropDownItem = ({ entry, index }: Props) => {
  return (
    <button
      key={entry[0] + "selector"}
      className={cn(
        "w-full text-left indent-3 py-1 block hover:bg-zinc-600 first:rounded-t-md last:rounded-b-md",
        index === selectedIndex && "bg-zinc-600"
      )}
      onClick={() => {
        setDisplayIndex(selectedIndex);
        setIsVisible(false);
      }}
      onMouseEnter={() => setSelectedIndex(index)}
    >
      <span className="font-semibold mr-2">{entry[1]}</span>
      <span>{entry[0].toUpperCase()}</span>
    </button>
  );
};

export default CurrencySelectorDropDownItem;
