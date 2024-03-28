"use client";

import { forwardRef, type ForwardedRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { useDropdownStore } from "@/hooks/useDropdownStore";

import { AnimatePresence } from "framer-motion";

const DropdownMenu = forwardRef(
  ({ ...props }: HTMLMotionProps<"div">, ref: ForwardedRef<HTMLDivElement>) => {
    const isVisible = useDropdownStore((s) => s.isVisible);

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
