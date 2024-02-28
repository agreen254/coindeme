import PriceComparisonChartWrapper from "./PriceComparisonChartWrapper";
import VolumeComparisonChartWrapper from "./VolumeComparisonChartWrapper";

const ComparisonCharts = () => {
  return (
    <div className="flex flex-col w-full justify-center gap-y-4">
      <div className="bg-zinc-900/70 rounded-t-3xl rounded-b-lg h-[calc(50%-0.5rem)]">
        <PriceComparisonChartWrapper />
      </div>
      <div className="bg-zinc-900/70 rounded-t-lg rounded-b-3xl h-[calc(50%-0.5rem)]">
        <VolumeComparisonChartWrapper />
      </div>
    </div>
  );
};

export default ComparisonCharts;
