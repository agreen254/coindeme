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
 * Create a small context that can allow any component tree to have a unique dropdown logic store.
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

// need to use ReturnType here because we want the structure of the store,
// not the structure of the function that created the store.
type DropdownStore = ReturnType<typeof createDropdownStore>;
export const DropdownContext = createContext<DropdownStore | null>(null);

/**
 * Hook to access methods and state from the parent provider.
 *
 * const foo = useDropdownContext(store => store.foo);
 */
export function useDropdownContext<T>(
  selector: (state: DropdownState) => T
): T {
  const store = useContext(DropdownContext);
  if (!store) {
    throw new Error("Missing a DropdownContext.Provider in the tree.");
  }

  return useStore(store, selector);
}

/**
 * Hook to reset the state of the dropdown. The returned callback itself is not a hook.
 *
 * This is useful because once the primary function is called at the top level of the component,
 * the returned callback can be used anywhere it is needed.
 *
 * Instead of having to manually import all of the methods each time this functionality is needed,
 * it is now hidden behind this hook.
 */
export function useResetDropdown() {
  const store = useContext(DropdownContext);
  if (!store) {
    throw new Error("Missing a DropdownContext.Provider in the tree.");
  }

  return () =>
    store.setState({
      isUsingMouse: false,
      menuIsVisible: false,
      menuSelectedIndex: -1,
    });
}
