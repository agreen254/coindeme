import { Bitcoin as BitcoinIcon } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useCoinQuery } from "@/hooks/useCoinQuery";
import { cn } from "@/utils/cn";

import CoinOverviewCategoriesCarousel from "./CoinOverviewCategoriesCarousel";
import CoinOverviewLink from "./CoinOverviewLink";

type Props = {
  response: ReturnType<typeof useCoinQuery>;
};

const CoinOverviewMainPanel = ({ response }: Props) => {
  const homepage = response.data?.links.homepage[0];
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  // reset checked copy to regular after use clicks it
  useEffect(() => {
    if (hasCopied) {
      setTimeout(() => {
        setHasCopied(false);
      }, 2 * 1000);
    }
  }, [hasCopied, setHasCopied]);

  return (
    <div className="min-h-[400px]">
      <div
        className={cn(
          "bg-zinc-900/70 border border-zinc-800 w-[432px] h-[312px] rounded-xl",
          response.isPending && "animate-pulse"
        )}
      >
        <div className="flex flex-col items-center mt-14 mb-3">
          {response.data ? (
            <>
              <Image
                src={response.data.image.large}
                width={110}
                height={110}
                alt={"logo for " + name}
                priority
              />
              <h2 className="mt-1">
                <span className="text-4xl">{response.data.name} </span>
                <span className="uppercase text-3xl font-semibold text-zinc-400">
                  {response.data.symbol}
                </span>
              </h2>
            </>
          ) : (
            <BitcoinIcon className="w-[80px] h-[80px] rounded-full text-white/15" />
          )}
        </div>
        <div className="my-8">
          <ErrorBoundary fallback={<div className="h-10"></div>}>
            <CoinOverviewCategoriesCarousel response={response} />
          </ErrorBoundary>
        </div>
      </div>
      <CoinOverviewLink
        link={homepage}
        isLoading={response.isPending}
        className={cn(
          "flex justify-center items-center h-[72px] w-full mt-4 text-lg rounded-xl bg-zinc-900/70 border border-zinc-800",
          response.isPending && "animate-pulse"
        )}
      />
    </div>
  );
};

export default CoinOverviewMainPanel;
