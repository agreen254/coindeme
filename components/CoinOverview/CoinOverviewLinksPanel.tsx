"use client";

import { useCoinQuery } from "@/hooks/useCoinQuery";

import CoinOverviewLink from "./CoinOverviewLink";

type Props = {
  response: ReturnType<typeof useCoinQuery>;
};

const CoinOverviewLinksPanel = ({ response }: Props) => {
  // Display three links while loading, but once response comes through only display the number of links returned.
  // If there are less than three links the API will show them as empty strings, hence the filtering.
  const links = response.data?.links.blockchain_site
    .slice(1, 4)
    .filter((l) => l !== "") ?? [null, null, null];

  return (
    <div className="flex flex-col mt-4">
      {links.map((l, idx) => (
        <CoinOverviewLink
          key={"link" + idx}
          className="flex justify-center items-center h-[72px] w-[555px] mt-4 text-lg"
          link={l}
          isLoading={response.isPending}
        />
      ))}
    </div>
  );
};

export default CoinOverviewLinksPanel;
