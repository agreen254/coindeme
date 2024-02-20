import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  return (
    <div className="flex justify-between">
      <div></div>
      <div className="mr-12 mt-8">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default NavBar;
