type Props = {
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
};

const ConverterAmountInput = ({ amount, setAmount }: Props) => {
  return (
    <input
      placeholder="0"
      type="number"
      min={0}
      className="w-[50%] p-2 pl-0 bg-zinc-900/70 text-right font-semibold focus:outline-none focus:border-b focus:border-slice focus:border-grad-l-blue"
      onChange={(e) => setAmount(parseFloat(e.currentTarget.value || "0"))}
      // stop leading zeros
      // https://github.com/facebook/react/issues/9402#issuecomment-447891987
      value={amount + ""}
    />
  );
};

export default ConverterAmountInput;
