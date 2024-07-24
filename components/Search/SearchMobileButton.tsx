import SearchIcon from "@/Icons/Search";

const SearchMobileButton = () => {
  return (
    <div className="h-[42px] w-[42px] screen-sm:w-[42px] screen-sm:h-[42px] flex justify-center items-center screen-sm:hidden rounded-md bg-white dark:bg-white/10 focus:outline-none focus:ring-[1.5px] focus:ring-black/50 focus:dark:ring-white/50 shadow-top shadow-zinc-500/60 disabled:cursor-not-allowed">
      <button>
        <span className="sr-only">Show search box</span>
        <SearchIcon className="w-[18px] h-[18px] fill-default" />
      </button>
    </div>
  );
};

export default SearchMobileButton;
