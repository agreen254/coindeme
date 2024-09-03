"use client";

import {
  useRef,
  forwardRef,
  type MutableRefObject,
  type ForwardedRef,
  type Dispatch,
  type SetStateAction,
} from "react";
import { ChevronDown as ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import { X as XIcon } from "lucide-react";
import { uid } from "uid";

import type { Asset, AssetValidator, CustomKeyHandlers } from "@/utils/types";
import { useUpdateAssets, validateAsset } from "@/hooks/useAssets";
import {
  useAssetModalActions,
  useAssetModalDefault,
  useAssetModalValues,
} from "@/hooks/useAssetModal";
import { useClickAway } from "@uidotdev/usehooks";
import {
  useDropdownResetFromId,
  useDropdownSettersFromId,
  useDropdownUnitFromId,
} from "@/hooks/useDropdownStore";
import { useForwardRef } from "@/hooks/useForwardRef";
import { useModalListener } from "@/hooks/useModalListener";
import { useDropdownKeyEvents } from "@/hooks/useDropdownKeyEvents";
import { useDropdownMenuMouseEnter } from "@/hooks/useDropdownMenuMouseEnter";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import { cn } from "@/utils/cn";
import { coinNameFromId } from "@/utils/coinNameFromId";
import { coinSymbolFromId } from "@/utils/coinSymbolFromId";
import { convertHistoricalDate } from "@/utils/dateHelpers";
import { currencyEntries, currencyMap } from "@/utils/maps";
import { getAdjustedIdxAndId } from "@/utils/getSearchElements";
import CloseIcon from "@/Icons/Close";
import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import DropdownMenuItem from "@/components/Dropdown/DropdownMenuItem";
import { HighlightedSearchResult } from "@/components/Search/SearchResultsHelpers";
import SearchActivator from "@/components/Search/SearchActivator";
import SearchStatus from "@/components/Search/SearchStatus";

import { currencyDropdownId, searchDropdownId } from "./AssetModalWrapper";
import AssetModalCoinSearch from "./Separators/AssetModalCoinSearch";
import AssetModalCurrency from "./Separators/AssetModalCurrency";
import AssetModalDate from "./AssetModalDate";

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
  const { assetId, coinId, coinQuery, date, value, valueCurrency } =
    useAssetModalValues();
  const { setCoinId, setCoinQuery, setDate, setValue, setValueCurrency } =
    useAssetModalActions();
  const restoreModalDefaults = useAssetModalDefault();

  // debounced search terms
  const { searchResults, searchTargets, numResults, isLoading, noResults } =
    useDebouncedSearch(coinQuery);

  const coinInfo = searchTargets?.find((res) => res.id === coinId);
  const coinName = coinInfo?.name ?? "";
  const coinImageUrl = coinInfo?.large ?? "";
  const coinSymbol = coinInfo?.symbol ?? "";

  // refs
  const coinDropdownRef = useRef<HTMLDivElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const currencyButtonRef = useRef<HTMLButtonElement>(null);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const clickAwaySearchRef: MutableRefObject<HTMLInputElement> = useClickAway(
    () => {
      resetSearchDropdown();
      setCoinQuery(coinNameFromId(coinId, searchTargets));
    }
  );
  const clickAwayCurrencyRef: MutableRefObject<HTMLDivElement> = useClickAway(
    () => {
      resetCurrency();
    }
  );
  const forwardedActivatorRef = useForwardRef(activatorRef);

  const handleModalExit = () => {
    setIsOpen(false);
    restoreModalDefaults();
    forwardedActivatorRef.current?.focus();
  };

  useModalListener(
    modalRef,
    assetId === "" ? clickAwaySearchRef : amountInputRef,
    isOpen,
    handleModalExit,
    [coinDropdownRef, currencyDropdownRef]
  );

  // dropdown handlers and state for the search input
  const handleMouseEnterSearch = useDropdownMenuMouseEnter(searchDropdownId);
  const { selectedIndex: selectedIndexSearch } =
    useDropdownUnitFromId(searchDropdownId);

  const resetSearchDropdown = useDropdownResetFromId(searchDropdownId);
  const resetSearchFields = () => {
    setCoinId(coinId);
    setCoinQuery(coinName);
    resetSearchDropdown();
  };

  const searchCustomKeyHandlers: CustomKeyHandlers = {
    Enter: (e) => {
      e.preventDefault();
      if (numResults) {
        const { adjustedId } = getAdjustedIdxAndId(
          selectedIndexSearch,
          searchResults
        );
        setCoinQuery(coinNameFromId(adjustedId, searchTargets));
        setCoinId(adjustedId);
      }
      resetSearchDropdown();
    },
    Escape: (_) => resetSearchFields(),
    Tab: (_) => resetSearchFields(),
  };

  const handleKeyDownSearch = useDropdownKeyEvents(
    searchDropdownId,
    numResults,
    searchCustomKeyHandlers
  );

  // dropdown handlers and state for the currency input
  const {
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

  const currencyCustomKeyHandlers: CustomKeyHandlers = {
    Enter: (e) => {
      e.preventDefault();
      if (selectedIndexCurrency >= 0) {
        setValueCurrency(currencyName);
      }
      setIsVisibleCurrency(!isVisibleCurrency);
      setSelectedIndexCurrency(-1);
    },
    Escape: (_) => resetCurrency(),
    Tab: (_) => resetCurrency(),
  };

  const handleKeyDownCurrencyMenu = useDropdownKeyEvents(
    currencyDropdownId,
    currencyEntries.length,
    currencyCustomKeyHandlers
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
      ref={modalRef}
      className={cn(
        "h-full w-full hidden justify-center items-center fixed top-0 left-0 backdrop-blur-md z-[100]",
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
            {coinId && coinImageUrl && (
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
            <AssetModalCoinSearch className="w-full relative">
              <XIcon
                className={cn(
                  "absolute right-[12px] top-[12px] w-[18px] h-[18px] cursor-pointer",
                  (!coinQuery || !!assetId) && "hidden"
                )}
                onClick={resetSearchFields}
                strokeWidth={2}
              />
              <label htmlFor="coinSearch" className="sr-only">
                search coins to declare asset
              </label>
              <SearchActivator
                ref={clickAwaySearchRef}
                id="coinSearch"
                type="text"
                dropdownId={searchDropdownId}
                autoComplete="off"
                spellCheck="false"
                disabled={!!assetId}
                searchResults={searchResults}
                className={cn(
                  "h-11 w-full p-2 rounded-lg dark:bg-zinc-800/60 bg-zinc-200/60",
                  !!assetId && "text-muted-foreground"
                )}
                query={coinQuery}
                setQuery={setCoinQuery}
                onKeyDown={handleKeyDownSearch}
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
                    key={wrapper.id + "searchResult"}
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
                        resetSearchDropdown();
                      }}
                      onMouseEnter={handleMouseEnterSearch(selectedIndexSearch)}
                    >
                      <HighlightedSearchResult wrapper={wrapper} />
                    </button>
                  </DropdownMenuItem>
                ))}
                <SearchStatus isLoading={isLoading} noResults={noResults} />
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
                onKeyDown={handleKeyDownCurrencyInput}
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
                onKeyDown={handleKeyDownCurrencyMenu}
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
            <AssetModalDate
              date={date}
              setDate={setDate}
              handleAsset={handleAsset}
            />
            <div className="flex justify-between gap-x-4 mt-4 text-center">
              <button
                className="w-1/2 rounded-md dark:bg-zinc-800/60 bg-zinc-200/60 h-[45px] hover:dark:bg-zinc-700/80 hover:bg-zinc-300/80 transition-colors"
                onClick={handleModalExit}
              >
                Cancel
              </button>
              <button
                className="w-1/2 rounded-md dark:bg-teal-900 bg-teal-300 shadow-[0_-1px_0_1px] dark:shadow-zinc-600/80 shadow-zinc-200 hover:dark:bg-teal-700 hover:bg-teal-200 transition-colors"
                onClick={handleAsset}
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
