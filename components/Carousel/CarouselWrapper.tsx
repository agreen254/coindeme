import type { MarketQueryResult } from "@/utils/types";
import { ErrorBoundary } from "react-error-boundary";
import Carousel from "./Carousel";

type Props = {
  queryResult: MarketQueryResult;
};

const CarouselWrapper = ({ queryResult }: Props) => {
  return (
    <div className="flex justify-center w-[240px]">
      <ErrorBoundary
        fallback={
          <p className="text-sm text-destructive">Failed to render carousel.</p>
        }
      >
        <Carousel queryResult={queryResult} />
      </ErrorBoundary>
    </div>
  );
};

export default CarouselWrapper;