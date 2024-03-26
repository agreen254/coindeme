"use client";

import { motion } from "framer-motion";
import { useDropdownStore } from "@/hooks/useDropdownStore";

import { AnimatePresence } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  motionKey: string;
};

const DropdownMenu = ({ children, className, motionKey }: Props) => {
  const isVisible = useDropdownStore((s) => s.isVisible);
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={motionKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeIn", duration: 0.2 }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DropdownMenu;
