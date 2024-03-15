type Props = {
  params: {
    id: string;
  };
};

const CoinPage = ({ params: { id } }: Props) => {
  return (
    <h1 className="mt-4 text-center">This is a placeholder page for {id}</h1>
  );
};

export default CoinPage;
