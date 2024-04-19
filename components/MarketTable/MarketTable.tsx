import type { MarketElementWithIdx } from "@/utils/types";

import MarketTableBody from "./MarketTableBody";
import MarketTableHeader from "./MarketTableHeader";

type Props = {
  data: MarketElementWithIdx[];
  initialIdx?: number;
};

const MarketTable = ({ data, initialIdx }: Props) => {
  return (
    <table className="table-fixed border-separate border-spacing-y-1 text-foreground opacity-90">
      <MarketTableHeader />
      <MarketTableBody
        data={data}
        initialIdx={initialIdx}
      />
    </table>
  );
};

export default MarketTable;
