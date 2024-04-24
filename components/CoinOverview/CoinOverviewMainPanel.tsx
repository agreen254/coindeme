import { Bitcoin as BitcoinIcon } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";
import Image from "next/image";

import { useCoinQuery } from "@/hooks/useCoinQuery";
import { cn } from "@/utils/cn";

import CoinOverviewCategoriesCarousel from "./CoinOverviewCategoriesCarousel";

type Props = {
  response: ReturnType<typeof useCoinQuery>;
};

const CoinOverviewMainPanel = ({ response }: Props) => {
  return (
    <div
      className={cn(
        "bg-zinc-900/70 border border-zinc-800 m-auto w-[432px] h-[256px] rounded-xl",
        response.isPending && "animate-pulse"
      )}
    >
      <div className="flex flex-col items-center mt-14 mb-3">
        {response.data ? (
          <>
            <Image
              src={response.data.image.large}
              width={80}
              height={80}
              alt={"logo for " + name}
              priority
            />
            <h2 className="mt-1">
              <span className="text-xl">{response.data.name} </span>
              <span className="uppercase font-semibold text-zinc-400">
                {response.data.symbol}
              </span>
            </h2>
          </>
        ) : (
          <BitcoinIcon className="w-[80px] h-[80px] rounded-full text-white/15" />
        )}
      </div>
      <div className="mb-8">
        <ErrorBoundary fallback={<div className="h-8"></div>}>
          <CoinOverviewCategoriesCarousel response={response} />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default CoinOverviewMainPanel;
