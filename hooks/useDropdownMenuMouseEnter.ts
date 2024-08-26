import { useDropdownSettersFromId } from "./useDropdownStore";

export const useDropdownMenuMouseEnter = (id: string) => {
  const { setIsUsingMouse, setSelectedIndex } = useDropdownSettersFromId(id);
  return (index: number) => () => {
    setIsUsingMouse(true);
    setSelectedIndex(index);
  };
};
