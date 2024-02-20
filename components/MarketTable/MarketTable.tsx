import type { Currency, MarketEleWithIdx } from "@/utils/types";

import MarketTableBody from "./MarketTableBody";
import MarketTableHeader from "./MarketTableHeader";

type Props = {
  data: MarketEleWithIdx[];

  currency?: Currency;
  initialIdx?: number;
};

const MarketTable = ({ data, currency, initialIdx }: Props) => {
  return (
    <table className="table-fixed border-separate border-spacing-y-1 text-foreground opacity-90">
      <MarketTableHeader />
      <MarketTableBody
        data={data}
        currency={currency}
        initialIdx={initialIdx}
      />
    </table>
  );
};

export default MarketTable;
