import { type ChangeEvent, type KeyboardEvent, useId } from "react";
import { cn } from "@/utils/cn";

type Props = {
  date: string;
  setDate: (_newDate: string) => void;
  handleAsset: () => void;
};

const AssetModalDate = ({ date, setDate, handleAsset }: Props) => {
  const id = useId();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.currentTarget.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAsset();
    }
  };

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        select date of asset purchase
      </label>
      <input
        type="date"
        id={id}
        className={cn(
          "h-11 w-full pl-2 pr-3 rounded-lg dark:bg-zinc-800/60 bg-zinc-200/60",
          date === "" && "text-muted-foreground"
        )}
        placeholder="Purchase date"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={date}
      />
    </div>
  );
};

export default AssetModalDate;
