"use client";

import { flatMarketRes } from "@/utils/flatMarketRes";
import {
  useAddAsset,
  useAddAssetActions,
  useAddAssetCoinId,
  useAddAssetDate,
  useAddAssetModalIsOpen,
} from "@/hooks/useAddAsset";
import { useClickAway } from "@uidotdev/usehooks";
import { useMarketQuery } from "@/hooks/useMarketQuery";
import { useModalListener } from "@/hooks/useModalListener";
import { useRef } from "react";

import AddAssetCurrency from "./AddAssetCurrency";
import AddCoin from "./AddAssetCoinSearch";
import CloseIcon from "@/Icons/Close";
import DropdownProvider from "@/components/Dropdown/DropdownProvider";
import Image from "next/image";

const AddAssetModal = () => {
  const isOpen = useAddAssetModalIsOpen();
  const { setAmount, setCoinId, setDate, setModalIsOpen } =
    useAddAssetActions();

  const market = useMarketQuery("usd", "market_cap", "desc");
  const coinId = useAddAssetCoinId();
  const date = useAddAssetDate();

  const exitModal = () => {
    setModalIsOpen(false);
    setCoinId("");
    setAmount(0);
    setDate("");
  };

  const coinInfo = flatMarketRes(market.data?.pages)?.find(
    (coin) => coin.id === coinId
  );
  const coinImageUrl = coinInfo?.image || "";
  const coinSymbol = coinInfo?.symbol || "";

  const modalRef = useRef<HTMLDivElement>(null);

  const clickAwayRef: React.MutableRefObject<HTMLDivElement> = useClickAway(
    () => exitModal()
  );

  useModalListener(modalRef, isOpen, exitModal);

  const handleAddAsset = useAddAsset();

  if (!isOpen) return <></>;
  return (
    <div
      role="dialog"
      aria-modal="true"
      ref={modalRef}
      className="h-full w-full flex justify-center items-center fixed top-0 left-0 backdrop-blur-md z-10"
    >
      <div
        ref={clickAwayRef}
        className="w-[886px] min-h-[400px] rounded-xl bg-zinc-900/70 border border-zinc-800"
      >
        <div className="p-12">
          <div className="flex justify-between">
            <h2 className="text-xl ml-1">Select Coins</h2>
            <label htmlFor="closeModal" className="sr-only">
              Close Modal
            </label>
            <button id="closeModal" onClick={() => setModalIsOpen(false)}>
              <CloseIcon className="w-6 h-6 hover:scale-110 transition-transform" />
            </button>
          </div>
          <div className="flex justify-between gap-8 mt-8">
            <div className="w-[297px] h-[241px] flex justify-center items-center rounded-lg bg-zinc-800/60">
              {coinId && (
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
                <AddCoin />
              </DropdownProvider>
              <DropdownProvider>
                <AddAssetCurrency />
              </DropdownProvider>
              <>
                <label htmlFor="date" className="sr-only">
                  select date of asset purchase
                </label>
                <input
                  type="date"
                  id="date"
                  className="h-11 pl-2 pr-4 rounded-lg bg-zinc-800/60"
                  placeholder="Purchase date"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddAsset();
                  }}
                  onChange={(e) => {
                    setDate(e.currentTarget.value);
                  }}
                  value={date}
                />
              </>
              <div className="flex justify-between gap-x-4 mt-4 text-center">
                <button
                  className="w-1/2 rounded-md bg-zinc-800/60 h-[45px]"
                  onClick={() => exitModal()}
                >
                  Cancel
                </button>
                <button
                  className="w-1/2 rounded-md bg-teal-900 shadow-[0_-1px_0_1px] shadow-zinc-600/80 hover:bg-teal-700 transition-colors"
                  onClick={() => {
                    handleAddAsset();
                  }}
                >
                  Add Asset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAssetModal;
