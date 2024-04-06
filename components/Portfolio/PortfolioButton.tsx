"use client";

import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";

import Link from "next/link";

const PortfolioButton = () => {
  const pathname = usePathname();
  const activeCn = "bg-[#5B9ACA]/80 shadow-[0_0_20px_8px] shadow-[#7878FA]/20";

  const inPortfolio = pathname === "/portfolio";

  return (
    <div className="w-[264px] h-12 flex justify-center items-center gap-x-1 rounded-full font-medium bg-white/10 shadow-top shadow-menu-highlight/30">
      <Link
        href="/"
        className={cn(
          "w-[120px] h-8 flex justify-center items-center rounded-full",
          !inPortfolio && activeCn
        )}
      >
        <span>Coins</span>
      </Link>
      <Link
        href="/portfolio"
        className={cn(
          "w-[120px] h-8 flex justify-center items-center rounded-full",
          inPortfolio && activeCn
        )}
      >
        Portfolio
      </Link>
    </div>
  );
};

export default PortfolioButton;
