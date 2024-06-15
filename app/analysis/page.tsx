import { Suspense } from "react";
import AnalysisWrapper from "@/components/Analysis/AnalysisWrapper";

const Analysis = () => {
  return (
    <Suspense>
      <AnalysisWrapper />
    </Suspense>
  );
};

export default Analysis;
