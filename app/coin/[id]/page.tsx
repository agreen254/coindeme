"use client";

import { useCoinQuery } from "@/hooks/useCoinQuery";

import CoinOverviewDescription from "@/components/CoinOverview/CoinOverviewDescription";
import CoinOverviewMainPanel from "@/components/CoinOverview/CoinOverviewMainPanel";

type Props = {
  params: {
    id: string;
  };
};

const CoinPage = ({ params: { id } }: Props) => {
  const response = useCoinQuery(id);

  return (
    <div className="w-full flex flex-col items-center">
      <CoinOverviewDescription response={response} />
      <CoinOverviewMainPanel response={response} />
    </div>
  );
};

export default CoinPage;
