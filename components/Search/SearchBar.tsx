import SearchIcon from "@/Icons/Search";

type Props = {
  disabled: boolean;
  searchText: string;
  
  // eslint-disable-next-line
  setSearchText: (text: string) => void;
};

const SearchBar = ({ disabled, searchText, setSearchText }: Props) => {
  return (
    <>
      <input
        type="text"
        placeholder={disabled ? "Loading..." : "Search..."}
        value={searchText}
        disabled={disabled}
        className="pr-5 pl-12 py-2 w-[320px] rounded-md bg-white/10 focus:outline-none focus:ring-[1.5px] focus:ring-white/80 shadow-[0_-0.5px_0_1px] shadow-zinc-500/60 disabled:cursor-not-allowed"
        onChange={(e) => setSearchText(e.currentTarget.value)}
      />
      <SearchIcon className="w-[18px] h-[18px] inline absolute left-4 top-[12px]" />
    </>
  );
};

export default SearchBar;
