"use client";

import { useCoinQuery } from "@/hooks/useCoinQuery";

import CoinOverviewLink from "./CoinOverviewLink";

type Props = {
  response: ReturnType<typeof useCoinQuery>;
};

const CoinOverviewLinksPanel = ({ response }: Props) => {
  const links = response.data?.links.blockchain_site
    .slice(1, 4)
    .filter((l) => l !== "") ?? [null, null, null];

  return (
    <div className="flex flex-col mt-4">
      {links.map((l, idx) => (
        <CoinOverviewLink
          key={"link" + idx}
          className="flex justify-center items-center h-[72px] w-[555px] mt-4 text-lg rounded-xl bg-zinc-900/70 border border-zinc-800"
          link={l}
          isLoading={response.isPending}
        />
      ))}
    </div>
  );
};

export default CoinOverviewLinksPanel;
