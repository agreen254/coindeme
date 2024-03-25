"use client";

import { motion } from "framer-motion";
import { useClickAway } from "@uidotdev/usehooks";
import { useDropdownContext, useResetDropdown } from "@/hooks/useDropdown";

import { AnimatePresence } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  motionKey: string;
  resetCallback: () => void;
};

const DropdownMenu = ({
  children,
  className,
  motionKey,
  resetCallback,
}: Props) => {
  const isVisible = useDropdownContext((s) => s.menuIsVisible);
  const resetMenu = useResetDropdown();

  const resetBarAndMenu = () => {
    resetCallback();
    resetMenu();
  };

  const clickAwayRef: React.MutableRefObject<HTMLDivElement> = useClickAway(
    () => {
      resetBarAndMenu();
    }
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={motionKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          ref={clickAwayRef}
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
