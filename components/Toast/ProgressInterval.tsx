"use client";

import { useEffect, useState } from "react";

type Props = {
  duration: number;
  isPaused: boolean;
};

const ProgressInterval = ({ duration, isPaused }: Props) => {
  const [progressRatio, setProgressRatio] = useState(0);
  const refreshRate = 16; // ms

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (progressRatio < 1 && !isPaused) {
        setProgressRatio(progressRatio + refreshRate / duration);
      }
    }, refreshRate);

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
