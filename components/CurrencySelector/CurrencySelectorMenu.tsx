import { motion } from "framer-motion";
import { useDropdownContext } from "@/hooks/useDropdown";

import { AnimatePresence } from "framer-motion";

type Props = {
  children: React.ReactNode;
  transitionLength: number;
};

const CurrencySelectorMenu = ({ children, transitionLength }: Props) => {
  const isVisible = useDropdownContext((s) => s.menuIsVisible);
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeIn", duration: transitionLength }}
          className="w-[108px] absolute top-[52px] z-10 rounded-md text-zinc-200 border border-stone-300 bg-dropdown"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CurrencySelectorMenu;
