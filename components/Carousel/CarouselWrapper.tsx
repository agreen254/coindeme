import type { MarketQueryResult } from "@/utils/types";
import { ErrorBoundary } from "react-error-boundary";
import CarouselHorizontal from "./CarouselHorizontal";

type Props = {
  queryResult: MarketQueryResult;
};

const CarouselWrapper = ({ queryResult }: Props) => {
  return (
    <div className="flex justify-center">
      <ErrorBoundary
        fallback={
          <p className="text-sm text-destructive text-center">
            Failed to render carousel.
          </p>
        }
      >
        <CarouselHorizontal queryResult={queryResult} />
      </ErrorBoundary>
    </div>
  );
};

export default CarouselWrapper;
