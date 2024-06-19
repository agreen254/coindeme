import { AnalysisSeries } from "@/utils/types";
import { chartColorSets } from "@/utils/comparisonChartHelpers/compareGeneralHelpers";

type Props = {
  series: AnalysisSeries[];
};

const AnalysisLegend = ({ series }: Props) => {
  return (
    <div>
      {series.map((s, idx) => (
        <div key={s.id} className="flex items-center ml-2">
          <div
            className="inline w-6 h-[6px] mr-2"
            style={{ backgroundColor: chartColorSets[idx].startColor.hex }}
          ></div>
          <span>
            {s.name} ({s.axis})
          </span>
        </div>
      ))}
    </div>
  );
};

export default AnalysisLegend;
