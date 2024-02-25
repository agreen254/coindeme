import { arrayOfSize } from "@/utils/arrayHelpers";

const CarouselSkeleton = () => {
  const numSkeletonElements = 5;
  const dummyArray = arrayOfSize(numSkeletonElements);

  return dummyArray.map((_, idx) => (
    <div
      key={"carouselSkeleton" + idx}
      className="flex-[0_0_auto] min-h-0 h-[75px] mb-4 py-4 flex-col justify-center w-[15rem] border bg-teal-900/80 rounded-md animate-pulse"
    ></div>
  ));
};

export default CarouselSkeleton;
