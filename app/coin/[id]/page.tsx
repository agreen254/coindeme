import CoinOverviewDescription from "@/components/CoinOverview/CoinOverviewDescription";

type Props = {
  params: {
    id: string;
  };
};

const CoinPage = ({ params: { id } }: Props) => {
  return (
    <div className="w-full flex justify-center">
      <CoinOverviewDescription id={id} />
    </div>
  );
};

export default CoinPage;
