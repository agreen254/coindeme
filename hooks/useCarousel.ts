import { create } from "zustand";

const MAX_NUM_SELECTED = 3 as const;

type CarouselState = {
  selectedElements: string[];
  actions: CarouselAction;
};

type CarouselAction = {
  handleSelect: (element: string) => void;
};

const useCarouselStore = create<CarouselState>((set) => ({
  selectedElements: ["bitcoin"],
  actions: {
    handleSelect: (element) =>
      set((state) => {
        if (state.selectedElements.includes(element)) {
          const newElements = state.selectedElements.filter(
            (selected) => selected !== element
          );
          return { selectedElements: newElements };
        } else {
          return state.selectedElements.length === MAX_NUM_SELECTED
            ? { selectedElements: state.selectedElements }
            : { selectedElements: [...state.selectedElements, element] };
        }
      }),
  },
}));

export const useCarouselSelectedElements = () => {
  return useCarouselStore((state) => state.selectedElements);
};
export const useCarouselActions = () => {
  return useCarouselStore((state) => state.actions);
};

// define additional hook to check if carousel is full
export const useCarouselHasMaxSelected = () => {
  return (
    useCarouselStore((state) => state.selectedElements).length ===
    MAX_NUM_SELECTED
  );
};
