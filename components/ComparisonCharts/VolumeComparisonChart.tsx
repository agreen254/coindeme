import type { ChartData, ScriptableContext } from "chart.js";
import type { ComparisonChartResponse } from "@/utils/types";

import { chartColorSets } from "@/utils/comparisonChartHelpers/compareGeneralHelpers";
import { prepareComparisonData } from "@/utils/comparisonChartHelpers/prepareComparisonData";
import {
  getVolumeChartOptions,
  stackItUp,
} from "@/utils/comparisonChartHelpers/compareVolumeHelpers";
import { useCarouselSelectedElements } from "@/hooks/useCarousel";
import { volumeComparisonGradient } from "@/utils/comparisonChartHelpers/compareVolumeHelpers";

import { Bar } from "react-chartjs-2";

type Props = {
  chartData: ComparisonChartResponse[];
};

const VolumeComparisonChart = ({ chartData }: Props) => {
  const selectedCoins = useCarouselSelectedElements();
  const { label, values } = prepareComparisonData(chartData, "total_volumes");
  const stackedValues = stackItUp(values, selectedCoins);

  const bg = (idx: number, context: ScriptableContext<"bar">) => {
    return stackedValues.map((ele) => {
      if (ele[idx].name === selectedCoins[0]) {
        return volumeComparisonGradient(context, 0);
      } else if (ele[idx].name === selectedCoins[1]) {
        return volumeComparisonGradient(context, 1);
      } else {
        return volumeComparisonGradient(context, 2);
      }
    });
  };

  const bgHover = (idx: number) => {
    return stackedValues.map((ele) => {
      if (ele[idx].name === selectedCoins[0]) {
        return chartColorSets[0].highlightColor.hex;
      } else if (ele[idx].name === selectedCoins[1]) {
        return chartColorSets[1].highlightColor.hex;
      } else {
        return chartColorSets[2].highlightColor.hex;
      }
    });
  };

  const volumeChartData: ChartData<"bar"> = {
    labels: label,

    /**
     * The compiler will throw an error here even though the charts work without any issues.
     * The backgroundColor prop accepts an array; but if that array is generated through the callback it's not considered valid for some reason.
     *
     * I have raised a github issue about this:
     * https://github.com/chartjs/Chart.js/issues/11711
     *
     * ts-ignore for now
     */
    // @ts-ignore
    datasets: chartData.map((_, idx) => {
      return {
        backgroundColor: function (context) {
          return bg(idx, context);
        },
        data: stackedValues.map((ele) => ele[idx].volume),
        label: idx.toString(),
        hoverBackgroundColor: bgHover(idx),
      };
    }),
  };

  return (
    <Bar
      data={volumeChartData}
      options={getVolumeChartOptions(selectedCoins)}
    />
  );
};

export default VolumeComparisonChart;
