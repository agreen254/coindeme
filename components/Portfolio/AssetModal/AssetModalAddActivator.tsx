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
        className="px-5 py-[10px] w-[256px] font-medium bg-teal-700 shadow-[0_0_20px_8px] shadow-market-teal/15 border border-white/0 rounded-md focus:outline-none focus:border-stone-300"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Add Asset
      </button>
    );
  }
);

export default AssetModalAddActivator;

AssetModalAddActivator.displayName = "AsssetAddModalActivator";
