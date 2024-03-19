"use client";

import { cn } from "@/utils/cn";
import { currencyMap } from "@/utils/maps";
import { motion } from "framer-motion";
import { useClickAway } from "@uidotdev/usehooks";
import { useState } from "react";

import { AnimatePresence } from "framer-motion";
import { ChevronDown as ChevronIcon } from "lucide-react";
import CoinsIcon from "@/Icons/Coins";

const CurrencySelector = () => {
  const [isVisible, setIsVisible] = useState(false);

  const clickAwayRef: React.MutableRefObject<HTMLDivElement> = useClickAway(
    () => {
      setIsVisible(false);
    }
  );
  const currencyEntries = Array.from(currencyMap.entries());

  return (
    <div className="relative" ref={clickAwayRef}>
      <button
        className="h-[42px] w-[108px] rounded-md bg-white/10 focus:outline-none focus:ring-[1px] focus:ring-white/50 shadow-top shadow-zinc-500/60 disabled:cursor-not-allowed"
        onClick={() => {
          setIsVisible((prev) => !prev);
        }}
      >
        <CoinsIcon className="w-6 h-6 mr-1 inline" />
        USD
        <ChevronIcon
          className={cn(
            "w-4 h-4 ml-1 inline transition-all",
            isVisible && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key={"currencies"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeIn", duration: 0.2 }}
            className="w-[108px] absolute top-[52px] z-10 rounded-md text-zinc-200 border border-stone-300 bg-dropdown"
          >
            {currencyEntries.map((entry) => (
              <button
                key={entry[0] + "selector"}
                className="w-full text-left indent-4 py-1 block hover:bg-zinc-600 first:rounded-t-md last:rounded-b-md"
                onClick={() => setIsVisible(false)}
              >
                <span className="font-semibold mr-2">{entry[1]}</span>
                <span>{entry[0].toUpperCase()}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CurrencySelector;
