import GlobalData from "./GlobalData";
import SearchWrapper from "../Search/SearchWrapper";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  return (
    <div className="mt-4 mb-12">
      <div className="flex justify-between mb-2">
        <div className="ml-12">
          portfolio button goes here
        </div>
        <div className="flex items-start gap-x-4">
          <SearchWrapper />
          <div className="mr-12">
            <ThemeToggle />
          </div>
        </div>
      </div>
      <GlobalData />
    </div>
  );
};

export default NavBar;
