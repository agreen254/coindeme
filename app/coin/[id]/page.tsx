type Props = {
  params: {
    id: string;
  };
};

const CoinPage = ({ params: { id } }: Props) => {
  return <div className="w-full flex justify-center">{id}</div>;
};

export default CoinPage;
