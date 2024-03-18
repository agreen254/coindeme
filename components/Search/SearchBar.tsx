import { useSearchBarActions, useSearchBarQuery } from "@/hooks/useSearchBar";
import SearchIcon from "@/Icons/Search";

type Props = {
  disabled: boolean;
};

const SearchBar = ({ disabled }: Props) => {
  const query = useSearchBarQuery();
  const { setMenuIsVisible, setQuery } = useSearchBarActions();

  return (
    <>
      <input
        type="search"
        placeholder={disabled ? "" : "Search..."}
        value={query}
        disabled={disabled}
        className="pr-5 pl-12 py-[9px] w-[320px] rounded-md bg-white/10 focus:outline-none focus:ring-[1.5px] focus:ring-white/50 shadow-[0_-0.5px_0_1px] shadow-zinc-500/60 disabled:cursor-not-allowed"
        onChange={(e) => {
          setQuery(e.currentTarget.value);
          if (e.currentTarget.value !== "") {
            setMenuIsVisible(true);
          } else {
            setMenuIsVisible(false);
          }
        }}
      />
      <SearchIcon className="w-[18px] h-[18px] inline absolute left-4 top-[12px]" />
    </>
  );
};

export default SearchBar;
