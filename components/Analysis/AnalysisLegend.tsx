import { AnalysisSeries } from "@/utils/types";
import { chartColorSets } from "@/utils/comparisonChartHelpers/compareGeneralHelpers";

type Props = {
  series: AnalysisSeries[];
};

const AnalysisLegend = ({ series }: Props) => {
  return series.map((s, idx) => (
    <div key={s.id} className="flex items-center ml-2">
      <div
        className="inline w-8 h-[6px] mr-2"
        style={{ backgroundColor: chartColorSets[idx].startColor.hex }}
      ></div>
      <span className="text-xl">
        {s.name} ({s.axis})
      </span>
    </div>
  ));
};

export default AnalysisLegend;
