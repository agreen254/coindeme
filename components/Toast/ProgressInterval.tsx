"use client";

import { useEffect, useState } from "react";

type Props = {
  duration: number;
  isPaused: boolean;
  refreshInterval?: number;
};

const ProgressInterval = ({ duration, isPaused, refreshInterval }: Props) => {
  const interval = refreshInterval ?? 25;
  const [progressRatio, setProgressRatio] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (progressRatio < 1 && !isPaused) {
        setProgressRatio((prev) => prev + interval / duration);
      }
    }, interval);

    return () => clearInterval(intervalId);
  }, [progressRatio, isPaused]);

  return (
    <div className="w-full flex rounded-b-lg">
      <div
        className="bg-red-500 h-1 rounded-bl-lg"
        style={{ width: `calc(${(1 - progressRatio) * 100}%)` }}
      ></div>
    </div>
  );
};

export default ProgressInterval;
