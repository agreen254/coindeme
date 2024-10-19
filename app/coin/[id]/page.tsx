"use client";

import { useCoinInfoQuery } from "@/hooks/useCoinInfoQuery";

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
  const response = useCoinInfoQuery(id);

  return (
    <main className="w-full flex justify-center">
      <div className="w-[90vw] screen-xl:w-table-xl">
        <div className="w-full grid grid-cols-1 screen-md:grid-cols-2 screen-xl:grid-cols-3 screen-xl:grid-rows-2 gap-6 h-auto screen-xl:h-[450px]">
          <CoinOverviewMainPanel response={response} />
          <CoinOverviewFirstDataPanel response={response} />
          <CoinOverviewSecondDataPanel response={response} />
        </div>
        <div className="grid grid-cols-1 screen-xl:grid-cols-3 gap-x-6 mb-[20vh]">
          <CoinOverviewDescription response={response} />
          <CoinOverviewLinksPanel response={response} />
        </div>
      </div>
    </main>
  );
};

export default CoinPage;
