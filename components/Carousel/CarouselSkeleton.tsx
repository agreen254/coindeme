import { arrayOfSize } from "@/utils/arrayHelpers";
import { cn } from "@/utils/cn";

type Props = {
  pulse: boolean;
};

const CarouselSkeleton = ({ pulse }: Props) => {
  const numSkeletonElements = 5;
  const dummyArray = arrayOfSize(numSkeletonElements);

  return dummyArray.map((_, idx) => (
    <div
      key={"carouselSkeleton" + idx}
      className={cn(
        "flex-[0_0_auto] min-h-0 h-[68px] mb-4 flex-col justify-center w-[15rem] border bg-teal-900/80 rounded-md",
        pulse && "animate-pulse"
      )}
    ></div>
  ));
};

export default CarouselSkeleton;
