import type { MarketQueryResult } from "@/utils/types";
import { ErrorBoundary } from "react-error-boundary";
import CarouselVertical from "./CarouselVertical";
import CarouselHorizontal from "./CarouselHorizontal";

type Props = {
  axis: "x" | "y";
  queryResult: MarketQueryResult;
};

const CarouselWrapper = ({ axis, queryResult }: Props) => {
  return (
    <div className="flex justify-center w-[240px]">
      <ErrorBoundary
        fallback={
          <p className="text-sm text-destructive">Failed to render carousel.</p>
        }
      >
        {axis === "x" ? (
          <CarouselHorizontal queryResult={queryResult} />
        ) : (
          <CarouselVertical queryResult={queryResult} />
        )}
      </ErrorBoundary>
    </div>
  );
};

export default CarouselWrapper;
