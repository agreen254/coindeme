"use client";

import { useClickAway } from "@uidotdev/usehooks";
import { useEffect } from "react";

import CloseIcon from "@/Icons/Close";

type Props = {
  open: boolean;
  // eslint-disable-next-line
  setOpen: (status: boolean) => void;
};

const AddAssetModal = ({ open, setOpen }: Props) => {
  const clickAwayRef: React.MutableRefObject<HTMLDivElement> = useClickAway(
    () => setOpen(false)
  );

  useEffect(() => {
    // prevent scrolling when modal is open
    if (open) {
      document.body.style.overflowY = "hidden";
    } else document.body.style.overflowY = "scroll";

    // make sure modal is closed when user presses escape key
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", close);

    return () => document.removeEventListener("keydown", close);
  }, [open, setOpen]);

  if (!open) return <></>;
  return (
    <div
      className="h-full w-full flex justify-center items-center fixed top-0 left-0 backdrop-blur-md z-10"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-[886px] min-h-[400px] rounded-xl bg-zinc-900/70 border border-zinc-800"
        ref={clickAwayRef}
      >
        <div className="p-12">
          <div className="flex justify-between">
            <h3 className="text-xl ml-1">Select Coins</h3>
            <button onClick={() => setOpen(false)}>
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="flex justify-between gap-8 mt-8">
            <div className="w-[297px] h-[241px] rounded-lg bg-zinc-800/60"></div>
            <div className="w-[461px] flex flex-col gap-y-4">
              <input
                type="text"
                className="h-11 pl-2 rounded-lg bg-zinc-800/60"
                placeholder="Select coins"
              />
              <input
                type="text"
                className="h-11 pl-2 rounded-lg bg-zinc-800/60"
                placeholder="Purchased amount"
              />
              <input
                type="text"
                className="h-11 pl-2 rounded-lg bg-zinc-800/60"
                placeholder="Purchase date"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAssetModal;
