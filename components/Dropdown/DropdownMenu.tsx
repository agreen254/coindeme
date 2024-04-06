"use client";

import { forwardRef, type ForwardedRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { useDropdownUnitFromId } from "@/hooks/useDropdownStore";

import { AnimatePresence } from "framer-motion";

interface DropdownMenuProps extends HTMLMotionProps<"div"> {
  dropdownId: string;
}

const DropdownMenu = forwardRef(
  (
    { dropdownId, ...props }: DropdownMenuProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { isVisible } = useDropdownUnitFromId(dropdownId);

    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeIn", duration: 0.2 }}
            {...props}
          >
            {props.children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

export default DropdownMenu;

DropdownMenu.displayName = "DropdownMenu";
