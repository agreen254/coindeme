"use client";

import { flatMarketRes } from "@/utils/flatMarketRes";
import {
  useAddAssetCoinId,
  useAddAssetHasFocus,
  useAddAssetActions,
} from "@/hooks/useAddAsset";
import { useClickAway } from "@uidotdev/usehooks";
import { useEffect, useRef } from "react";
import { useMarketQuery } from "@/hooks/useMarketQuery";

import AddAssetCurrency from "./AddAssetCurrency";
import AddCoin from "./AddAssetCoinSearch";
import CloseIcon from "@/Icons/Close";
import DropdownProvider from "@/components/Dropdown/DropdownProvider";
import Image from "next/image";

type Props = {
  open: boolean;
  // eslint-disable-next-line
  setOpen: (status: boolean) => void;
};

const AddAssetModal = ({ open, setOpen }: Props) => {
  const market = useMarketQuery("usd", "market_cap", "desc");
  const hasFocus = useAddAssetHasFocus();
  const selectedCoinId = useAddAssetCoinId();
  const { setCoinId } = useAddAssetActions();

  const clearOnExit = () => {
    setOpen(false);
    setCoinId("");
  };

  const coinInfo = flatMarketRes(market.data?.pages)?.find(
    (coin) => coin.id === selectedCoinId
  );

  const coinImageUrl = coinInfo?.image || "";
  const coinSymbol = coinInfo?.symbol || "";

  // refs used to check if any of the dropdown menus are open
  // if they are and the user clicks out, want the dropdown to close not the whole modal
  const coinSearchRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);

  const clickAwayRef: React.MutableRefObject<HTMLDivElement> = useClickAway(
    () => {
      if (!coinSearchRef?.current && !currencyRef?.current) {
        clearOnExit();
      }
    }
  );

  useEffect(() => {
    // prevent scrolling when modal is open
    if (open) {
      document.body.style.overflowY = "hidden";
    } else document.body.style.overflowY = "scroll";

    // make sure modal is closed when user presses escape key,
    // but if any dropdowns are open we want those to close instead
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !coinSearchRef?.current && !hasFocus) {
        clearOnExit();
      }
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
        ref={clickAwayRef}
        className="w-[886px] min-h-[400px] rounded-xl bg-zinc-900/70 border border-zinc-800"
      >
        <div className="p-12">
          <div className="flex justify-between">
            <h3 className="text-xl ml-1">Select Coins</h3>
            <button onClick={() => setOpen(false)}>
              <CloseIcon className="w-6 h-6 hover:scale-110 transition-transform" />
            </button>
          </div>
          <div className="flex justify-between gap-8 mt-8">
            <div className="w-[297px] h-[241px] flex justify-center items-center rounded-lg bg-zinc-800/60">
              {selectedCoinId && (
                <div>
                  <Image
                    src={coinImageUrl}
                    alt="coin logo"
                    width={80}
                    height={80}
                  />
                  <p className="text-center text-lg font-semibold text-muted-foreground uppercase mt-2">
                    {coinSymbol}
                  </p>
                </div>
              )}
            </div>
            <div className="w-[461px] flex flex-col gap-y-4">
              <DropdownProvider>
                <AddCoin ref={coinSearchRef} />
              </DropdownProvider>
              <DropdownProvider>
                <AddAssetCurrency ref={currencyRef} />
              </DropdownProvider>
              <input
                type="date"
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
