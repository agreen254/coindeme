import ComparisonChartsTimeSelector from "./ComparisonChartsTimeSelector";
import PriceComparisonChartWrapper from "./PriceComparisonChartWrapper";
import VolumeComparisonChartWrapper from "./VolumeComparisonChartWrapper";

const ComparisonCharts = () => {
  return (
    <div className="w-full">
      <div className="flex w-full h-[500px] justify-center gap-x-8">
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl w-[calc(50%-0.5rem)]">
          <PriceComparisonChartWrapper />
        </div>
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl w-[calc(50%-0.5rem)]">
          <VolumeComparisonChartWrapper />
        </div>
      </div>
      <div className="mt-4">
        <ComparisonChartsTimeSelector />
      </div>
    </div>
  );
};

export default ComparisonCharts;
