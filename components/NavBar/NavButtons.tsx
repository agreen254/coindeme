"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/utils/cn";

const NavButtons = () => {
  const pathname = usePathname();
  const baseCn =
    "screen-lg:w-[120px] p-6 screen-lg:p-0 h-8 flex justify-center items-center rounded-md screen-lg:rounded-full";
  const activeCn =
    "bg-[#7DC6E3]/80 dark:bg-[#5B9ACA]/80 shadow-[0_0_20px_8px] shadow-[#7878FA]/20";

  const inPortfolio = pathname === "/portfolio";
  const inConverter = pathname === "/converter";
  const inAnalysis = pathname === "/analysis";
  const inHome = !(inPortfolio || inConverter || inAnalysis);

  return (
    <>
      <Link href="/" className={cn(baseCn, inHome && activeCn)}>
        Coins
      </Link>
      <Link
        href={{ pathname: "/converter", query: {} }}
        className={cn(baseCn, inConverter && activeCn)}
      >
        Converter
      </Link>
      <Link
        href={{ pathname: "/portfolio", query: {} }}
        className={cn(baseCn, inPortfolio && activeCn)}
      >
        Portfolio
      </Link>
      <Link
        href={{ pathname: "/analysis", query: {} }}
        className={cn(baseCn, inAnalysis && activeCn)}
      >
        Analysis
      </Link>
    </>
  );
};

export default NavButtons;
