import { Bitcoin as BitcoinIcon } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";
import Image from "next/image";

import { useCoinQuery } from "@/hooks/useCoinQuery";
import { cn } from "@/utils/cn";

import CoinOverviewCategoriesCarousel from "./CoinOverviewCategoriesCarousel";
import CoinOverviewLink from "./CoinOverviewLink";
import Panel from "../Theme/Panel";

type Props = {
  response: ReturnType<typeof useCoinQuery>;
};

const CoinOverviewMainPanel = ({ response }: Props) => {
  const homepage = response.data?.links.homepage[0];

  return (
    <div className="min-h-[400px]">
      <Panel
        className={cn(
          "w-[432px] h-[312px]",
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
                <span className="uppercase text-3xl font-semibold text-zinc-600 dark:text-zinc-400">
                  {response.data.symbol}
                </span>
              </h2>
            </>
          ) : (
            <BitcoinIcon className="w-[80px] h-[80px] rounded-full text-black/85 dark:text-white/15" />
          )}
        </div>
        <div className="my-8">
          <ErrorBoundary fallback={<div className="h-10"></div>}>
            <CoinOverviewCategoriesCarousel response={response} />
          </ErrorBoundary>
        </div>
      </Panel>
      <CoinOverviewLink
        link={homepage}
        isLoading={response.isPending}
        className={cn(
          "flex justify-center items-center h-[72px] w-full mt-4 text-lg",
          response.isPending && "animate-pulse"
        )}
      />
    </div>
  );
};

export default CoinOverviewMainPanel;
