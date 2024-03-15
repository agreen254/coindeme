import GlobalData from "./GlobalData";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  return (
    <div className="mt-3">
      <GlobalData />
      <div className="flex justify-between">
        <div></div>
        <div className="mr-12 mt-8">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default NavBar;