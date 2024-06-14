import {
  forwardRef,
  type ForwardedRef,
  type Dispatch,
  type SetStateAction,
} from "react";

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const AssetModalAddActivator = forwardRef(
  ({ setIsOpen }: Props, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
      <button
        ref={ref}
        className="px-5 py-[10px] w-[256px] font-medium dark:bg-teal-700 bg-teal-300 shadow-[0_0_20px_8px] dark:shadow-market-teal/15 shadow-teal-200/40 box-content border dark:border-transparent rounded-md focus:outline-none focus:dark:border-stone-300 focus:border-stone-700"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Add Asset
      </button>
    );
  }
);

export default AssetModalAddActivator;

AssetModalAddActivator.displayName = "AsssetAddModalActivator";
