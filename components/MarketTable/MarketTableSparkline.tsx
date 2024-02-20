"use client";

import type { ChartData } from "chart.js";

import { consecutiveArray } from "@/utils/arrayHelpers";
import {
  sparklineColor,
  sparklineOptions,
  sparklineGradient,
} from "@/utils/sparklineHelpers";
import { useInView } from "framer-motion";
import { useRef } from "react";

import {
  Chart as ChartJS,
  Filler,
  LineElement,
  PointElement,
} from "chart.js/auto";
import { ErrorBoundary } from "react-error-boundary";
import { Line } from "react-chartjs-2";

ChartJS.register(Filler, LineElement, PointElement);

type Props = {
  data: number[];
  id: string;
  isGaining: boolean;
};

const MarketTableSparkline = ({ data, id, isGaining }: Props) => {
  // only render charts if they've actually been in view
  const viewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(viewRef, { once: true });

  // length is 56 so be sure to include the last point (which isn't divisible by 3)
  const efficientData = [
    ...data.filter((_, idx) => idx % 3 === 0),
    data[data.length - 1],
  ];

  const chartData: ChartData<"line"> = {
    labels: consecutiveArray(efficientData.length),
    datasets: [
      {
        label: id,
        data: efficientData,
        borderColor: sparklineColor(isGaining),
        backgroundColor: (context) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 100);
          return sparklineGradient(isGaining, gradient);
        },
        fill: true,
        tension: 0.5,
      },
    ],
  };

  return (
    <ErrorBoundary
      fallback={
        <p className="text-sm text-center text-destructive">
          failed to render sparkline.
        </p>
      }
    >
      <div className="mr-6">
        <div className="w-48 h-16" ref={viewRef}>
          {isInView && <Line data={chartData} options={sparklineOptions} />}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default MarketTableSparkline;
