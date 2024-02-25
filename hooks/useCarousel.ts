import { create } from "zustand";

const MAX_NUM_SELECTED = 3 as const;

type CarouselState = {
  selectedElements: string[];
  actions: CarouselAction;
};

type CarouselAction = {
  handleSelect: (id: string) => void;
  clearAll: () => void;
};

const useCarouselStore = create<CarouselState>((set) => ({
  selectedElements: ["bitcoin"],
  actions: {
    handleSelect: (id) =>
      set((state) => {
        if (state.selectedElements.includes(id)) {
          const newElements = state.selectedElements.filter(
            (selected) => selected !== id
          );
          return { selectedElements: newElements };
        } else {
          return state.selectedElements.length === MAX_NUM_SELECTED
            ? { selectedElements: state.selectedElements }
            : { selectedElements: [...state.selectedElements, id] };
        }
      }),
    clearAll: () => set(() => ({ selectedElements: [] })),
  },
}));

export const useCarouselSelectedElements = () => {
  return useCarouselStore((state) => state.selectedElements);
};
export const useCarouselActions = () => {
  return useCarouselStore((state) => state.actions);
};

// additional helper hooks
export const useCarouselCardIsSelected = (id: string): boolean => {
  return useCarouselStore((state) => state.selectedElements).includes(id);
};
export const useCarouselHasMaxSelected = (): boolean => {
  return (
    useCarouselStore((state) => state.selectedElements).length ===
    MAX_NUM_SELECTED
  );
};
