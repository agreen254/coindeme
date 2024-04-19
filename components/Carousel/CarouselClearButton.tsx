"use client";

import { useCarouselActions } from "@/hooks/useCarousel";
import { useCarouselHasNoneSelected } from "@/hooks/useCarousel";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const CarouselClearButton = ({ children, ...props }: Props) => {
  const { clearAll } = useCarouselActions();
  const hasNoneSelected = useCarouselHasNoneSelected();

  return (
    <button disabled={hasNoneSelected} onClick={clearAll} {...props}>
      {children}
    </button>
  );
};

export default CarouselClearButton;
