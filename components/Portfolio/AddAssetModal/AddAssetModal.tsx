"use client";

import { flatMarketRes } from "@/utils/flatMarketRes";
import {
  useAddAssetActions,
  useAddAssetAmount,
  useAddAssetAmountCurrency,
  useAddAssetCoinId,
  useAddAssetDate,
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
  const coinId = useAddAssetCoinId();
  const { setAmount, setCoinId, setDate } = useAddAssetActions();

  const amount = useAddAssetAmount();
  const amountCurrency = useAddAssetAmountCurrency();
  const date = useAddAssetDate();

  const exitModal = () => {
    setOpen(false);
    setCoinId("");
    setAmount(0);
  };

  const coinInfo = flatMarketRes(market.data?.pages)?.find(
    (coin) => coin.id === coinId
  );
  const coinImageUrl = coinInfo?.image || "";
  const coinSymbol = coinInfo?.symbol || "";

  // refs used to check if any of the dropdown menus are open
  // if they are and the user clicks out, want the dropdown to close not the whole modal
  const coinSearchRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const clickAwayRef: React.MutableRefObject<HTMLDivElement> = useClickAway(
    () => {
      if (!coinSearchRef?.current && !currencyRef?.current) {
        exitModal();
      }
    }
  );

  useEffect(() => {
    // prevent scrolling when modal is open
    if (open) {
      document.body.style.overflowY = "hidden";

      // trap focus within modal while it is open
      // https://medium.com/cstech/achieving-focus-trapping-in-a-react-modal-component-3f28f596f35b
      const modalElement = modalRef.current;
      const focusableElements = modalElement?.querySelectorAll(
        // eslint-disable-next-line
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0];
      const lastElement = focusableElements?.[focusableElements.length - 1];

      const handleTabKeyPress = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            if (lastElement instanceof HTMLElement) lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            if (firstElement instanceof HTMLElement) firstElement.focus();
          }
        }
      };

      modalElement?.addEventListener("keydown", handleTabKeyPress);

      return () => {
        modalElement?.removeEventListener("keydown", handleTabKeyPress);
      };
    } else document.body.style.overflowY = "scroll";

    // make sure modal is closed when user presses escape key,
    // but if any dropdowns are open we want those to close instead
    const handleModalKeys = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (!coinSearchRef?.current && !currencyRef?.current) exitModal();
      }
    };
    document.addEventListener("keydown", handleModalKeys);

    return () => {
      document.removeEventListener("keydown", handleModalKeys);
    };
  }, [open, setOpen]);

  const handleAddAsset = () => {
    const data = {
      id: coinId,
      amount: amount,
      amountCurrency: amountCurrency,

      // date html input always stores format as yyyy-mm-dd
      date: date,
    };
  };

  if (!open) return <></>;
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
            <h3 className="text-xl ml-1">Select Coins</h3>
            <label htmlFor="closeModal" className="sr-only">
              Close Modal
            </label>
            <button id="closeModal" onClick={() => setOpen(false)}>
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
                <AddCoin ref={coinSearchRef} />
              </DropdownProvider>
              <DropdownProvider>
                <AddAssetCurrency ref={currencyRef} />
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
                    if (e.key === "Enter") alert("submit!");
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
                <button className="w-1/2 rounded-md bg-[rgba(52,211,153,0.25)] shadow-[0_-1px_0_1px] shadow-zinc-500/60">
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
