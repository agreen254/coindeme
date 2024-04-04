import { createStore, useStore } from "zustand";
import { createContext, useContext } from "react";
import { replaceArrayUnit } from "@/utils/replaceArrayUnit";

export interface DropdownUnit {
  id: string;
  isUsingMouse: boolean;
  isVisible: boolean;
  selectedIndex: number;
}

interface DropdownState {
  units: DropdownUnit[];
  createUnit: (id: string) => void;

  setIsUsingMouse: (status: DropdownUnit["isUsingMouse"], id: string) => void;
  setIsVisible: (status: DropdownUnit["isVisible"], id: string) => void;
  setSelectedIndex: (index: DropdownUnit["selectedIndex"], id: string) => void;

  toggleIsVisible: (id: string) => void;
}

export function initializeNewDropdown(id: string): DropdownUnit {
  return {
    id: id,
    isUsingMouse: false,
    isVisible: false,
    selectedIndex: -1,
  };
}

/**
 * Create a store of multiple dropdown objects.
 * This allows for better composition in the modal components.
 * If the provider can be raised one layer higher all dropdowns can exist under the same provider, allowing for modal logic to be in one file.
 */
export const createDropdownStore = (units: DropdownUnit[] = []) => {
  return createStore<DropdownState>()((set) => ({
    units: units,
    createUnit: (id) =>
      set((state) => {
        const alreadyExists = state.units.find((unit) => unit.id === id);
        if (alreadyExists) return state;

        const initProps: DropdownUnit = {
          id: id,
          isUsingMouse: false,
          isVisible: false,
          selectedIndex: -1,
        };
        const newUnit: DropdownUnit = {
          ...initProps,
        };
        return { units: [...state.units, newUnit] };
      }),

    setIsUsingMouse: (status, id) =>
      set((state) => {
        const idx = state.units.findIndex((unit) => unit.id === id);
        const newUnit: DropdownUnit = {
          id: id,
          isUsingMouse: status,
          isVisible: state.units[idx].isVisible,
          selectedIndex: state.units[idx].selectedIndex,
        };
        const newUnits = replaceArrayUnit<DropdownUnit>(
          state.units,
          newUnit,
          idx
        );
        return { units: newUnits };
      }),

    setIsVisible: (status, id) =>
      set((state) => {
        const idx = state.units.findIndex((unit) => unit.id === id);
        const newUnit: DropdownUnit = {
          id: id,
          isUsingMouse: state.units[idx].isUsingMouse,
          isVisible: status,
          selectedIndex: state.units[idx].selectedIndex,
        };
        const newUnits = replaceArrayUnit<DropdownUnit>(
          state.units,
          newUnit,
          idx
        );
        return { units: newUnits };
      }),

    setSelectedIndex: (index, id) =>
      set((state) => {
        const idx = state.units.findIndex((unit) => unit.id === id);
        const newUnit: DropdownUnit = {
          id: id,
          isUsingMouse: state.units[idx].isUsingMouse,
          isVisible: state.units[idx].isVisible,
          selectedIndex: index,
        };
        const newUnits = replaceArrayUnit<DropdownUnit>(
          state.units,
          newUnit,
          idx
        );
        return { units: newUnits };
      }),

    toggleIsVisible: (id) =>
      set((state) => {
        const idx = state.units.findIndex((unit) => unit.id === id);
        if (idx === -1) return state;

        const newUnit: DropdownUnit = {
          ...state.units[idx],
          isVisible: !state.units[idx].isVisible,
        };
        const newUnits = replaceArrayUnit<DropdownUnit>(
          state.units,
          newUnit,
          idx
        );
        return { units: newUnits };
      }),
  }));
};

type DropdownStore = ReturnType<typeof createDropdownStore>;
export const DropdownContext = createContext<DropdownStore | null>(null);

/**
 * Hook to access methods and state from the parent provider.
 *
 * const foo = useDropdownsStore(store => store.foo);
 */
export function useDropdownStore<T>(selector: (state: DropdownState) => T): T {
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
export function useDropdownResetFromId(id: string) {
  const store = useContext(DropdownContext);
  if (!store) {
    throw new Error("Missing a DropdownContext.Provider in the tree.");
  }
  const units = store.getState().units;
  const idx = units.findIndex((unit) => unit.id === id);
  const newUnit = {
    id: id,
    isVisible: false,
    isUsingMouse: false,
    selectedIndex: -1,
  };
  const newUnits = replaceArrayUnit<DropdownUnit>(units, newUnit, idx);

  return () =>
    store.setState({
      ...store.getState(),
      units: newUnits,
    });
}

export function useDropdownUnitFromId(id: string) {
  const store = useContext(DropdownContext);
  if (!store) {
    throw new Error("Missing a DropdownContext.Provider in the tree.");
  }

  const unit = store.getState().units.find((unit) => unit.id === id);
  if (!unit) {
    throw new Error(
      `Attempted to access invalid ID ${id} in the active dropdown context.`
    );
  }

  return unit;
}

/**
 * A helper hook to avoid needing to repeatedly enter ids for the setters.
 */
export function useDropdownSettersFromId(id: string) {
  const store = useContext(DropdownContext);
  if (!store) {
    throw new Error("Missing a DropdownContext.Provider in the tree.");
  }

  const { setIsUsingMouse, setIsVisible, setSelectedIndex } = useDropdownStore(
    (store) => store
  );

  return {
    setIsUsingMouse: (status: boolean) => setIsUsingMouse(status, id),
    setIsVisible: (status: boolean) => setIsVisible(status, id),
    setSelectedIndex: (index: number) => setSelectedIndex(index, id),
  };
}
