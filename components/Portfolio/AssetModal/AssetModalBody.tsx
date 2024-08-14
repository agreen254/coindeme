"use client";

import {
  useRef,
  forwardRef,
  type ForwardedRef,
  type Dispatch,
  type SetStateAction,
} from "react";
import { ChevronDown as ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import { X as XIcon } from "lucide-react";
import { uid } from "uid";

import type { Asset, AssetValidator } from "@/utils/types";
import { useUpdateAssets, validateAsset } from "@/hooks/useAssets";
import {
  useAssetModalActions,
  useAssetModalDefault,
  useAssetModalAssetId,
  useAssetModalCoinId,
  useAssetModalCoinQuery,
  useAssetModalDate,
  useAssetModalValue,
  useAssetModalValueCurrency,
} from "@/hooks/useAssetModal";
import { useClickAway } from "@uidotdev/usehooks";
import {
  useDropdownResetFromId,
  useDropdownSettersFromId,
  useDropdownUnitFromId,
} from "@/hooks/useDropdownStore";
import { useForwardRef } from "@/hooks/useForwardRef";
import { useMarketQuery } from "@/hooks/useMarketQuery";
import { useModalListener } from "@/hooks/useModalListener";
import { cn } from "@/utils/cn";
import { coinNameFromId } from "@/utils/coinNameFromId";
import { coinSymbolFromId } from "@/utils/coinSymbolFromId";
import { convertHistoricalDate } from "@/utils/dateHelpers";
import { currencyEntries, currencyMap } from "@/utils/maps";
import { flatMarketRes } from "@/utils/flatMarketRes";
import { getSearchTargets, getSearchResults } from "@/utils/getSearchElements";
import CloseIcon from "@/Icons/Close";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import DropdownMenuItem from "@/components/Dropdown/DropdownMenuItem";
import {
  HandleNameMatch,
  HandleSymbolMatch,
} from "@/components/Search/SearchResultsHelpers";
import SearchActivator from "@/components/Search/SearchActivator";

import { currencyDropdownId, searchDropdownId } from "./AssetModalWrapper";
import AssetModalCoinSearch from "./Separators/AssetModalCoinSearch";
import AssetModalCurrency from "./Separators/AssetModalCurrency";
import AssetModalDate from "./Separators/AssetModalDate";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

/**
 * This modal allows users to add or edit assets. It is designed to be keyboard-friendly
 * and uses refs to keep track of focus states.
 *
 * Assets follow the asset schema defined in the validation folder.
 * This component contains state to manage input of the necessary fields.
 *
 * The dropdown menus have a context to store each state based on unique IDs defined in the wrapper component.
 *
 * Render each modal along with the asset; consider refactoring to one global modal if there is a significant performance hit.
 */
const AssetModalBody = (
  { isOpen, setIsOpen }: Props,
  activatorRef: ForwardedRef<HTMLButtonElement>
) => {
  const [assetId, coinId, coinQuery, date, value, valueCurrency] = [
    useAssetModalAssetId(),
    useAssetModalCoinId(),
    useAssetModalCoinQuery(),
    useAssetModalDate(),
    useAssetModalValue(),
    useAssetModalValueCurrency(),
  ];
  const { setCoinId, setCoinQuery, setDate, setValue, setValueCurrency } =
    useAssetModalActions();
  const restoreModalDefaults = useAssetModalDefault();

  // search component initializers
  const market = useMarketQuery("usd", "market_cap", "desc");
  const searchTargets = getSearchTargets(market.data?.pages);
  const searchResults = searchTargets
    ? getSearchResults(searchTargets, coinQuery)
    : [];

  const coinInfo = flatMarketRes(market.data?.pages)?.find(
    (coin) => coin.id === coinId
  );
  const coinName = coinInfo?.name ?? "";
  const coinImageUrl = coinInfo?.image ?? "";
  const coinSymbol = coinInfo?.symbol ?? "";

  // refs
  const coinInputRef = useRef<HTMLInputElement>(null);
  const coinDropdownRef = useRef<HTMLDivElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const currencyButtonRef = useRef<HTMLButtonElement>(null);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const clickAwaySearchRef: React.MutableRefObject<HTMLDivElement> =
    useClickAway(() => {
      resetSearch();
      setCoinQuery(coinNameFromId(coinId, searchTargets));
    });
  const clickAwayCurrencyRef: React.MutableRefObject<HTMLDivElement> =
    useClickAway(() => {
      resetCurrency();
    });
  const forwardedActivatorRef = useForwardRef(activatorRef);

  // dropdown handlers and state for the search input
  const {
    setIsUsingMouse: setIsUsingMouseSearch,
    setSelectedIndex: setSelectedIndexSearch,
  } = useDropdownSettersFromId(searchDropdownId);
  const { isVisible: isVisibleSearch, selectedIndex: selectedIndexSearch } =
    useDropdownUnitFromId(searchDropdownId);
  const resetSearch = useDropdownResetFromId(searchDropdownId);

  const handleKeyDownSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowUp": {
        e.preventDefault();
        setIsUsingMouseSearch(false);
        setSelectedIndexSearch(
          selectedIndexSearch > 0
            ? selectedIndexSearch - 1
            : searchResults.length - 1
        );
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        setIsUsingMouseSearch(false);
        setSelectedIndexSearch(
          selectedIndexSearch < searchResults.length - 1
            ? selectedIndexSearch + 1
            : 0
        );
        break;
      }
      case "Enter": {
        e.preventDefault();
        if (!isVisibleSearch) {
          handleAsset();
          break;
        }
        // if there are no results nothing will happen,
        // otherwise if user hits enter with nothing selected then default to the first result
        if (
          searchResults.length > 0 &&
          searchResults.length > selectedIndexSearch
        ) {
          const id =
            selectedIndexSearch === -1
              ? searchResults[0].id
              : searchResults[selectedIndexSearch].id;
          setCoinQuery(coinNameFromId(id, searchTargets));
          setCoinId(id);
        }
        resetSearch();
        break;
      }
      case "Escape": {
        setCoinId("");
        setCoinQuery("");
        resetSearch();
        break;
      }
      case "Tab": {
        if (isVisibleSearch) {
          e.preventDefault();
          break;
        }
      }
    }
  };

  // dropdown handlers and state for the currency input
  const {
    setIsUsingMouse: setIsUsingMouseCurrency,
    setIsVisible: setIsVisibleCurrency,
    setSelectedIndex: setSelectedIndexCurrency,
  } = useDropdownSettersFromId(currencyDropdownId);
  const { isVisible: isVisibleCurrency, selectedIndex: selectedIndexCurrency } =
    useDropdownUnitFromId(currencyDropdownId);
  const resetCurrency = useDropdownResetFromId(currencyDropdownId);

  const currencyName =
    selectedIndexCurrency === -1
      ? "usd"
      : currencyEntries[selectedIndexCurrency][0];

  const handleKeyDownCurrencyInput = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      (e.key >= "0" && e.key <= "9") ||
      ["Tab", "Backspace", "Escape", "."].includes(e.key)
    )
      return;
    if (e.key === "Enter") {
      e.preventDefault();
      handleAsset();
    }
    e.preventDefault();
  };

  const handleKeyDownCurrencyMenu = (
    e: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    switch (e.key) {
      case "ArrowUp": {
        e.preventDefault();
        setIsUsingMouseCurrency(false);
        setSelectedIndexCurrency(
          selectedIndexCurrency <= 0
            ? currencyEntries.length - 1
            : selectedIndexCurrency - 1
        );
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        setIsUsingMouseCurrency(false);
        setSelectedIndexCurrency(
          selectedIndexCurrency === currencyEntries.length - 1
            ? 0
            : selectedIndexCurrency + 1
        );
        break;
      }
      case "Escape": {
        resetCurrency();
        break;
      }
      case "Enter": {
        e.preventDefault();
        if (selectedIndexCurrency >= 0) {
          setValueCurrency(currencyName);
        }
        setIsVisibleCurrency(!isVisibleCurrency);
        setSelectedIndexCurrency(-1);
        break;
      }
      case "Tab": {
        if (isVisibleCurrency) {
          e.preventDefault();
          break;
        }
      }
    }
  };

  const handleModalExit = () => {
    setIsOpen(false);
    restoreModalDefaults();
    forwardedActivatorRef.current?.focus();
  };

  useModalListener(
    modalRef,
    assetId === "" ? coinInputRef : amountInputRef,
    isOpen,
    handleModalExit,
    [coinDropdownRef, currencyDropdownRef]
  );

  const updateAssets = useUpdateAssets();
  const handleAsset = () => {
    const maybeAsset: AssetValidator = {
      coinName: coinName,
      coinId: coinId,
      coinImage: coinImageUrl,
      coinSymbol: coinSymbolFromId(coinId, searchTargets),
      date: new Date(date),
      value: parseFloat(value || "0"),
      valueCurrency: valueCurrency,
    };

    const isValid = validateAsset(maybeAsset);
    if (isValid) {
      const asset: Asset = {
        ...maybeAsset,
        assetId: assetId || uid(),
        date: convertHistoricalDate(maybeAsset.date),
      };
      handleModalExit();
      forwardedActivatorRef.current?.focus();
      updateAssets(asset, !!assetId);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      ref={modalRef}
      className={cn(
        "h-full w-full hidden justify-center items-center fixed top-0 left-0 backdrop-blur-md z-10",
        isOpen && "flex flex-col"
      )}
    >
      <div className="w-[90vw] max-w-[886px] min-h-[400px] p-6 screen-sm:p-12 rounded-xl dark:bg-zinc-900 bg-zinc-50 border dark:border-zinc-800 border-zinc-200">
        <div className="flex justify-between">
          <h2 className="text-xl ml-1">
            {assetId ? "Edit Asset" : "Add Asset"}
          </h2>
          <label htmlFor="closeModal" className="sr-only">
            Close Modal
          </label>
          <button
            id="closeModal"
            className="p-2 rounded-full"
            onClick={handleModalExit}
          >
            <CloseIcon className="w-6 h-6 hover:scale-110 transition-transform" />
          </button>
        </div>
        <div className="gap-8 mt-8 grid grid-cols-1 screen-sm:grid-cols-2">
          <div className="h-[241px] flex justify-center items-center rounded-lg dark:bg-zinc-800/60 bg-zinc-200/60">
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
          <div className="flex flex-col gap-y-4 row-start-1 screen-sm:row-auto">
            <AssetModalCoinSearch
              ref={clickAwaySearchRef}
              className="w-full relative"
            >
              <XIcon
                className={cn(
                  "absolute right-[12px] top-[12px] w-[18px] h-[18px]",
                  (!coinQuery || !!assetId) && "hidden"
                )}
                onClick={() => {
                  resetSearch();
                  setCoinId("");
                  setCoinQuery("");
                }}
                strokeWidth={2}
              />
              <label htmlFor="coinSearch" className="sr-only">
                search coins to declare asset
              </label>
              <SearchActivator
                ref={coinInputRef}
                id="coinSearch"
                type="text"
                dropdownId={searchDropdownId}
                autoComplete="off"
                spellCheck="false"
                disabled={!searchTargets || !!assetId}
                searchResults={searchResults}
                className={cn(
                  "h-11 w-full p-2 rounded-lg dark:bg-zinc-800/60 bg-zinc-200/60",
                  !!assetId && "text-muted-foreground"
                )}
                localQuery={coinQuery}
                setLocalQuery={setCoinQuery}
                onKeyDown={(e) => handleKeyDownSearch(e)}
              />
              <DropdownMenu
                ref={coinDropdownRef}
                dropdownId={searchDropdownId}
                key="searchResults"
                className="max-w-[calc(90vw-3rem)] w-[460px] max-h-[320px] overflow-y-auto bg-dropdown border border-stone-300 overscroll-contain font-normal rounded-md text-default absolute top-[52px] z-10"
              >
                {searchResults.map((wrapper, idx) => (
                  <DropdownMenuItem
                    dropdownId="portfolioSearch"
                    index={idx}
                    key={wrapper.result.target + "searchResult"}
                  >
                    <button
                      tabIndex={-1}
                      className={cn(
                        "indent-3 py-1 block w-full text-start",
                        idx === selectedIndexSearch &&
                          "dark:bg-zinc-600 bg-zinc-200"
                      )}
                      onClick={() => {
                        setCoinId(wrapper.id);
                        setCoinQuery(
                          wrapper.kind === "symbol"
                            ? wrapper.otherText
                            : wrapper.result.target
                        );
                        resetSearch();
                      }}
                      onMouseEnter={() => {
                        setIsUsingMouseSearch(true);
                        setSelectedIndexSearch(idx);
                      }}
                    >
                      {wrapper.kind === "symbol"
                        ? HandleSymbolMatch(wrapper)
                        : HandleNameMatch(wrapper)}
                    </button>
                  </DropdownMenuItem>
                ))}
                {searchResults.length === 0 && (
                  <p className="italic text-muted-foreground font-medium py-1 indent-3">
                    No results found.
                  </p>
                )}
              </DropdownMenu>
            </AssetModalCoinSearch>
            <AssetModalCurrency
              className="w-full relative flex gap-x-2 justify-between"
              ref={clickAwayCurrencyRef}
            >
              <span
                className={cn(
                  "absolute text-muted-foreground left-2 top-[10px]",
                  value && "text-inherit"
                )}
              >
                {currencyMap.get(valueCurrency)}
              </span>
              <label htmlFor="amount" className="sr-only">
                Enter amount purchased
              </label>
              <input
                type="text"
                id="amount"
                ref={amountInputRef}
                placeholder="0"
                autoComplete="off"
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
                onKeyDown={(e) => handleKeyDownCurrencyInput(e)}
                className="h-11 w-full pl-5 rounded-lg dark:bg-zinc-800/60 bg-zinc-200/60"
              />
              <label htmlFor="assetCurrency" className="sr-only">
                select purchase currency
              </label>
              <button
                id="assetCurrency"
                ref={currencyButtonRef}
                className={cn(
                  "py-2 pr-2 pl-3 min-w-[5rem] rounded-lg dark:bg-zinc-800/60 bg-zinc-200/60",
                  isVisibleCurrency && "border-2 border-muted-foreground"
                )}
                onKeyDown={(e) => handleKeyDownCurrencyMenu(e)}
                onClick={() => setIsVisibleCurrency(!isVisibleCurrency)}
              >
                <span>{valueCurrency.toUpperCase()}</span>
                <span>
                  <ChevronDownIcon
                    className={cn(
                      "w-4 h-4 ml-1 inline transition-transform",
                      isVisibleCurrency && "rotate-180"
                    )}
                  />
                </span>
              </button>
              <DropdownMenu
                dropdownId={currencyDropdownId}
                ref={currencyDropdownRef}
                key="addCurrency"
                className="absolute w-[5rem] top-[52px] right-0 rounded-md bg-dropdown border border-stone-300"
              >
                {currencyEntries.map((entry, idx) => (
                  <DropdownMenuItem
                    dropdownId={currencyDropdownId}
                    key={entry[0] + "asset"}
                    index={idx}
                    className={cn(
                      selectedIndexCurrency === idx &&
                        "dark:bg-zinc-600 bg-zinc-200 first:rounded-t-md last:rounded-b-md"
                    )}
                  >
                    <button
                      className="w-full text-center py-1 block"
                      tabIndex={-1}
                      onMouseEnter={() => setSelectedIndexCurrency(idx)}
                      onClick={() => {
                        setValueCurrency(currencyName);
                        resetCurrency();
                      }}
                    >
                      <span className="font-semibold mr-2 ">{entry[1]}</span>
                      <span>{entry[0].toUpperCase()}</span>
                    </button>
                  </DropdownMenuItem>
                ))}
              </DropdownMenu>
            </AssetModalCurrency>
            <AssetModalDate>
              <label htmlFor="date" className="sr-only">
                select date of asset purchase
              </label>
              <input
                type="date"
                id="date"
                className={cn(
                  "h-11 w-full pl-2 pr-3 rounded-lg dark:bg-zinc-800/60 bg-zinc-200/60",
                  date === "" && "text-muted-foreground"
                )}
                placeholder="Purchase date"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAsset();
                  }
                }}
                onChange={(e) => {
                  setDate(e.currentTarget.value);
                }}
                value={date}
              />
            </AssetModalDate>
            <div className="flex justify-between gap-x-4 mt-4 text-center">
              <button
                className="w-1/2 rounded-md dark:bg-zinc-800/60 bg-zinc-200/60 h-[45px] hover:dark:bg-zinc-700/80 hover:bg-zinc-300/80 transition-colors"
                onClick={handleModalExit}
              >
                Cancel
              </button>
              <button
                className="w-1/2 rounded-md dark:bg-teal-900 bg-teal-300 shadow-[0_-1px_0_1px] dark:shadow-zinc-600/80 shadow-zinc-200 hover:dark:bg-teal-700 hover:bg-teal-200 transition-colors"
                onClick={() => {
                  handleAsset();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAsset();
                  }
                }}
              >
                {assetId ? "Confirm Edit" : "Add Asset"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(AssetModalBody);
