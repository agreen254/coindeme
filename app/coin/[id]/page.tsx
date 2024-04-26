"use client";

import { useCoinQuery } from "@/hooks/useCoinQuery";

import CoinOverviewDescription from "@/components/CoinOverview/CoinOverviewDescription";
import CoinOverviewMainPanel from "@/components/CoinOverview/CoinOverviewMainPanel";
import CoinOverviewStatsOnePanel from "@/components/CoinOverview/CoinOverviewStatsOnePanel";

type Props = {
  params: {
    id: string;
  };
};

const CoinPage = ({ params: { id } }: Props) => {
  const response = useCoinQuery(id);

  return (
    <div className="w-[1467px]">
      <div className="w-full flex items-start justify-center gap-x-6">
        <CoinOverviewMainPanel response={response} />
        <CoinOverviewStatsOnePanel response={response} />
      </div>
      <CoinOverviewDescription response={response} />
    </div>
  );
};

export default CoinPage;
