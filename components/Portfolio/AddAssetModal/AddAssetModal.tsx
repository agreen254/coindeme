"use client";

import { useClickAway } from "@uidotdev/usehooks";
import { useEffect } from "react";

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
    open && (document.body.style.overflowY = "hidden");
    !open && (document.body.style.overflowY = "scroll");
  }, [open]);

  if (!open) return <></>;
  return (
    <div
      className="h-full w-full flex justify-center items-center fixed top-0 left-0 backdrop-blur-md z-10"
      style={{ scrollbarGutter: "stable" }}
    >
      <div
        className="w-1/2 h-1/3 bg-zinc-900/70 border border-zinc-800"
        ref={clickAwayRef}
      ></div>
    </div>
  );
};

export default AddAssetModal;
