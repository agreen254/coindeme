import { Bitcoin as BitcoinIcon } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";
import Image from "next/image";

import { useCoinInfoQuery } from "@/hooks/useCoinInfoQuery";
import { cn } from "@/utils/cn";

import CoinOverviewCategoriesCarousel from "./CoinOverviewCategoriesCarousel";
import CoinOverviewLink from "./CoinOverviewLink";
import Panel from "../Theme/Panel";

type Props = {
  response: ReturnType<typeof useCoinInfoQuery>;
};

const CoinOverviewMainPanel = ({ response }: Props) => {
  const homepage = response.data?.links.homepage[0];

  return (
    <div className="grid grid-rows-4 grid-cols-1 row-span-2">
      <Panel
        className={cn("row-span-3", response.isPending && "animate-pulse")}
      >
        <div className="flex flex-col items-center mt-14">
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
                <span className="text-2xl screen-md:text-4xl">
                  {response.data.name}{" "}
                </span>
                <span className="uppercase text-lg screen-md:text-3xl font-semibold text-zinc-600 dark:text-zinc-400">
                  {response.data.symbol}
                </span>
              </h2>
            </>
          ) : (
            <BitcoinIcon className="w-[80px] h-[80px] rounded-full text-black/85 dark:text-white/15" />
          )}
        </div>
        <div className="my-4 screen-md:my-8">
          <ErrorBoundary fallback={<></>}>
            <CoinOverviewCategoriesCarousel response={response} />
          </ErrorBoundary>
        </div>
      </Panel>
      <CoinOverviewLink
        link={homepage}
        isLoading={response.isPending}
        className={cn(
          "flex justify-center items-center w-full mt-4 text-lg",
          response.isPending && "animate-pulse"
        )}
      />
    </div>
  );
};

export default CoinOverviewMainPanel;
