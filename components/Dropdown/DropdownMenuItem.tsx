"use client";

import { useDropdownContext } from "@/hooks/useDropdown";
import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  index: number;
};

const DropdownMenuItem = ({ children, index }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const isUsingMouse = useDropdownContext((s) => s.isUsingMouse);
  const selectedIndex = useDropdownContext((s) => s.menuSelectedIndex);

  // prevent scrolling beyond what the user can see
  // the `isUsingMouse` check is necessary to prevent auto-scrolling if you navigate with the mouse
  useEffect(() => {
    if (index === selectedIndex && !isUsingMouse) {
      ref.current?.scrollIntoView({ behavior: "instant", block: "center" });
    }
  }, [selectedIndex, isUsingMouse]);

  return <div ref={ref}>{children}</div>;
};

export default DropdownMenuItem;
