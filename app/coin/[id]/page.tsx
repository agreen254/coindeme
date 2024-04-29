"use client";

import { useCoinQuery } from "@/hooks/useCoinQuery";

import CoinOverviewDescription from "@/components/CoinOverview/CoinOverviewDescription";
import CoinOverviewMainPanel from "@/components/CoinOverview/CoinOverviewMainPanel";
import CoinOverviewFirstDataPanel from "@/components/CoinOverview/CoinOverviewFirstDataPanel";
import CoinOverviewSecondDataPanel from "@/components/CoinOverview/CoinOverviewSecondDataPanel";
import CoinOverviewLinksPanel from "@/components/CoinOverview/CoinOverviewLinksPanel";

type Props = {
  params: {
    id: string;
  };
};

const CoinPage = ({ params: { id } }: Props) => {
  const response = useCoinQuery(id);

  return (
    <div className="w-full flex justify-center">
      <div className="w-[1467px]">
        <div className="w-full flex items-start justify-center gap-x-6">
          <CoinOverviewMainPanel response={response} />
          <CoinOverviewFirstDataPanel response={response} />
          <CoinOverviewSecondDataPanel response={response} />
        </div>
        <div className="w-full flex items-start justify-start gap-x-6">
          <CoinOverviewDescription response={response} />
          <CoinOverviewLinksPanel response={response} />
        </div>
      </div>
    </div>
  );
};

export default CoinPage;
