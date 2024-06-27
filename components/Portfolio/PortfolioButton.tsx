"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/utils/cn";

const PortfolioButton = () => {
  const pathname = usePathname();
  const activeCn =
    "bg-[#7DC6E3]/80 dark:bg-[#5B9ACA]/80 shadow-[0_0_20px_8px] shadow-[#7878FA]/20";

  const inPortfolio = pathname === "/portfolio";
  const inConverter = pathname === "/converter";
  const inAnalysis = pathname === "/analysis";
  const inHome = !(inPortfolio || inConverter || inAnalysis);

  return (
    <div className="w-[520px] h-12 flex justify-center items-center gap-x-1 rounded-full text-zinc-700 dark:text-default font-medium bg-white dark:bg-white/10 shadow-top shadow-menu-highlight/30">
      <Link
        href="/"
        className={cn(
          "w-[120px] h-8 flex justify-center items-center rounded-full",
          inHome && activeCn
        )}
      >
        Coins
      </Link>
      <Link
        href={{ pathname: "/converter", query: {} }}
        className={cn(
          "w-[120px] h-8 flex justify-center items-center rounded-full",
          inConverter && activeCn
        )}
      >
        Converter
      </Link>
      <Link
        href={{ pathname: "/portfolio", query: {} }}
        className={cn(
          "w-[120px] h-8 flex justify-center items-center rounded-full",
          inPortfolio && activeCn
        )}
      >
        Portfolio
      </Link>
      <Link
        href={{ pathname: "/analysis", query: {} }}
        className={cn(
          "w-[120px] h-8 flex justify-center items-center rounded-full",
          inAnalysis && activeCn
        )}
      >
        Analysis
      </Link>
    </div>
  );
};

export default PortfolioButton;
