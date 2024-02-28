import type { ChartData, ChartOptions } from "chart.js";
import type { ComparisonChartResponse } from "@/utils/types";

import {
  Chart as ChartJS,
  Filler,
  LineElement,
  PointElement,
} from "chart.js/auto";
import {
  handleTicksXAxis,
  handleTicksYAxis,
} from "@/utils/comparisonChartHelpers";

import { ErrorBoundary } from "react-error-boundary";
import { Line } from "react-chartjs-2";

ChartJS.register(Filler, LineElement, PointElement);

type Props = {
  data: ComparisonChartResponse;
};

const PriceComparisonChart = ({ data }: Props) => {
  const x = data.prices.map((price) => price[0]); // UNIX time
  const y = data.prices.map((price) => price[1]); // price

  const options: ChartOptions<"line"> = {
    elements: {
      point: {
        radius: 0,
        hoverRadius: 0,
      },
    },
    scales: {
      x: {
        ticks: {
          callback: function (val, idx) {
            const label = this.getLabelForValue(val as number);
            return handleTicksXAxis(label, idx);
          },
        },
      },
      y: {
        ticks: {
          callback: function (val, idx) {
            return handleTicksYAxis(val as number, idx);
          },
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  const chartData: ChartData<"line"> = {
    labels: x,
    datasets: [
      {
        label: "btc",
        data: y,
        fill: true,
      },
    ],
  };

  return (
    <ErrorBoundary
      fallback={
        <p className="text-sm text-center text-destructive">
          Failed to render comparison chart for bitcoin.
        </p>
      }
    >
      <Line data={chartData} options={options} />
    </ErrorBoundary>
  );
};

export default PriceComparisonChart;
