import {
  forwardRef,
  useId,
  type ForwardedRef,
  type Dispatch,
  type SetStateAction,
} from "react";

import { SquarePen as SquarePenIcon } from "lucide-react";

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const AssetModalEditActivator = (
  { setIsOpen }: Props,
  editButtonRef: ForwardedRef<HTMLButtonElement>
) => {
  const editButtonId = useId();
  return (
    <>
      <label htmlFor={editButtonId} className="sr-only">
        edit this asset
      </label>
      <button
        id={editButtonId}
        ref={editButtonRef}
        className="absolute top-3 right-4 p-1 rounded-md border-2 border-white/0 focus:outline-none focus:border-stone-500"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <SquarePenIcon className="w-6 h-6" />
      </button>
    </>
  );
};

export default forwardRef(AssetModalEditActivator);
