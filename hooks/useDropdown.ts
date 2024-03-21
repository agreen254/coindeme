import { createStore, useStore } from "zustand";
import { createContext, useContext } from "react";

interface DropdownProps {
  isUsingMouse: boolean;
  menuIsVisible: boolean;
  menuSelectedIndex: number;
}

interface DropdownState extends DropdownProps {
  setIsUsingMouse: (status: DropdownProps["isUsingMouse"]) => void;
  setMenuIsVisible: (status: DropdownProps["menuIsVisible"]) => void;
  setMenuSelectedIndex: (index: DropdownProps["menuSelectedIndex"]) => void;
}

/**
 * This paired with a context provider effectively allows an indeterminate number of different
 * dropdown menus to be used without each one needing its own custom hook to manage its state.
 *
 * Some Docs:
 * https://docs.pmnd.rs/zustand/guides/initialize-state-with-props#common-patterns
 * https://tkdodo.eu/blog/working-with-zustand (scroll to the comment by lgenzelis on Nov 22 2022 and open the replies)
 * https://medium.com/@NickIannelli/nested-context-the-underrated-aspect-thats-probably-missing-from-your-react-app-16e73f7d1
 */
export const createDropdownStore = (initProps?: Partial<DropdownProps>) => {
  const fallbackProps: DropdownProps = {
    isUsingMouse: false,
    menuIsVisible: false,
    menuSelectedIndex: -1,
  };

  return createStore<DropdownState>()((set) => ({
    ...fallbackProps,
    ...initProps,
    setIsUsingMouse: (status) => set(() => ({ isUsingMouse: status })),
    setMenuIsVisible: (status) => set(() => ({ menuIsVisible: status })),
    setMenuSelectedIndex: (index) => set(() => ({ menuSelectedIndex: index })),
  }));
};

type DropdownStore = ReturnType<typeof createDropdownStore>;
export const DropdownContext = createContext<DropdownStore | null>(null);

export function useDropdownContext<T>(
  selector: (state: DropdownState) => T
): T {
  const store = useContext(DropdownContext);
  if (!store) {
    throw new Error("Missing a DropdownContext.Provider in the tree.");
  }

  return useStore(store, selector);
}
