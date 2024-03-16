"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import {
  Moon as MoonIcon,
  MoreHorizontal as MoreHorizontalIcon,
  SunMedium as SunIcon,
} from "lucide-react";

const ThemeToggle = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setIsMounted(true), []);

  if (!isMounted)
    return (
      <div className="flex items-center gap-x-4 rounded-md">
        <span className="sr-only">Loading theme...</span>
        <button className="px-2 py-2 border rounded-md">
          <MoreHorizontalIcon className="w-6 h-6" />
        </button>
      </div>
    );

  return (
    <div className="flex items-center gap-x-4 rounded-md shadow-top shadow-zinc-500/60">
      <button
        className="px-2 py-2 border rounded-md bg-white/10 hover:bg-stone-300 dark:hover:bg-stone-600 transition-colors"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <span className="sr-only">Change Theme</span>
        {theme === "dark" ? (
          <SunIcon className="w-6 h-6" />
        ) : (
          <MoonIcon className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
