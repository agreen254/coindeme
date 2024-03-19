"use client";

import { KeyboardEvent } from "react";

import { cn } from "@/utils/cn";
import { currencyMap } from "@/utils/maps";
import { motion } from "framer-motion";
import { useClickAway } from "@uidotdev/usehooks";
import { useState } from "react";

import { AnimatePresence } from "framer-motion";
import { ChevronDown as ChevronIcon } from "lucide-react";
import CoinsIcon from "@/Icons/Coins";

const CurrencySelector = () => {
  const transitionLength = 0.2; // seconds

  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // do not actually update the value in the menu until the user selects a new one
  const [displayedIndex, setDisplayedIndex] = useState(0);

  const currencyEntries = Array.from(currencyMap.entries());

  const handleCurrencyKeyEvents = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(
        selectedIndex === 0 ? currencyEntries.length - 1 : selectedIndex - 1
      );
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(
        selectedIndex === currencyEntries.length - 1 ? 0 : selectedIndex + 1
      );
    }
    if (e.key === "Enter") {
      e.preventDefault();
      setDisplayedIndex(selectedIndex);
      setIsVisible(!isVisible);
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setIsVisible(false);
    }
  };

  const clickAwayRef: React.MutableRefObject<HTMLDivElement> = useClickAway(
    () => {
      setIsVisible(false);
    }
  );

  return (
    <div className="relative" ref={clickAwayRef}>
      <button
        className="h-[42px] w-[108px] rounded-md flex justify-evenly items-center bg-white/10 focus:outline-none focus:ring-[1px] focus:ring-white/50 shadow-top shadow-zinc-500/60 disabled:cursor-not-allowed"
        onClick={() => {
          setIsVisible((prev) => !prev);
        }}
        onKeyDown={(e) => handleCurrencyKeyEvents(e)}
      >
        <CoinsIcon className="w-6 h-6 ml-2 inline" />
        {currencyEntries[displayedIndex][0].toUpperCase()}
        <ChevronIcon
          className={cn(
            "w-4 h-4 mr-2 inline transition-all",
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
            transition={{ ease: "easeIn", duration: transitionLength }}
            className="w-[108px] absolute top-[52px] z-10 rounded-md text-zinc-200 border border-stone-300 bg-dropdown"
          >
            {currencyEntries.map((entry, idx) => (
              <button
                key={entry[0] + "selector"}
                className={cn(
                  "w-full text-left indent-3 py-1 block hover:bg-zinc-600 first:rounded-t-md last:rounded-b-md",
                  idx === selectedIndex && "bg-zinc-600"
                )}
                onClick={() => {
                  setDisplayedIndex(selectedIndex);
                  setIsVisible(false);
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
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
