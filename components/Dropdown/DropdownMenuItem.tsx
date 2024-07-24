"use client";

import { useEffect, useRef } from "react";
import { useDropdownUnitFromId } from "@/hooks/useDropdownStore";
import { cn } from "@/utils/cn";

interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  dropdownId: string;
  index: number;
}

const DropdownMenuItem = ({
  dropdownId,
  index,
  ...props
}: DropdownMenuItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isUsingMouse, selectedIndex } = useDropdownUnitFromId(dropdownId);

  // prevent scrolling beyond what the user can see
  // the `isUsingMouse` check is necessary to prevent auto-scrolling if you navigate with the mouse
  useEffect(() => {
    if (index === selectedIndex && !isUsingMouse) {
      ref.current?.scrollIntoView({ behavior: "instant", block: "center" });
    }
  }, [selectedIndex, isUsingMouse]);

  return (
    <div
      ref={ref}
      {...props}
      className={cn("text-sm screen-sm:text-base", props.className)}
    >
      {props.children}
    </div>
  );
};

export default DropdownMenuItem;
