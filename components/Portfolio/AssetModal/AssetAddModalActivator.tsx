import {
  forwardRef,
  type ForwardedRef,
  type Dispatch,
  type SetStateAction,
} from "react";

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const AssetAddModalActivator = forwardRef(
  ({ setIsOpen }: Props, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
      <button
        ref={ref}
        className="rounded-lg px-5 py-3 bg-zinc-600/70 border border-zinc-800 focus:outline-none focus:border-2 focus:border-stone-300"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Add Asset
      </button>
    );
  }
);

export default AssetAddModalActivator;

AssetAddModalActivator.displayName = "AsssetAddModalActivator";
