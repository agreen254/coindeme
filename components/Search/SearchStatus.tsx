import { cn } from "@/utils/cn";
import { HTMLAttributes } from "react";

type Props = {
  noResults: boolean;
  isLoading: boolean;
  isLoadingCn?: HTMLAttributes<HTMLParagraphElement>["className"];
  noResultsCn?: HTMLAttributes<HTMLParagraphElement>["className"];
};

const SearchStatus = ({
  noResults,
  noResultsCn,
  isLoading,
  isLoadingCn,
}: Props) => {
  if (isLoading)
    return (
      <p
        className={cn(
          "italic text-muted-foreground font-medium py-1 indent-3",
          isLoadingCn
        )}
      >
        Loading results...
      </p>
    );
  else if (noResults)
    return (
      <p
        className={cn(
          "italic text-muted-foreground font-medium py-1 indent-3",
          noResultsCn
        )}
      >
        No results found.
      </p>
    );
  else return undefined;
};

export default SearchStatus;
