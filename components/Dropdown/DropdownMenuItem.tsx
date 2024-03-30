"use client";

import { useDropdownStore } from "@/hooks/useDropdownStore";
import { useEffect, useRef } from "react";

interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

const DropdownMenuItem = ({ index, ...props }: DropdownMenuItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isUsingMouse, selectedIndex } = useDropdownStore((state) => state);

  // prevent scrolling beyond what the user can see
  // the `isUsingMouse` check is necessary to prevent auto-scrolling if you navigate with the mouse
  useEffect(() => {
    if (index === selectedIndex && !isUsingMouse) {
      ref.current?.scrollIntoView({ behavior: "instant", block: "center" });
    }
  }, [selectedIndex, isUsingMouse]);

  return (
    <div ref={ref} {...props}>
      {props.children}
    </div>
  );
};

export default DropdownMenuItem;
