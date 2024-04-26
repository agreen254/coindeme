"use client";

import { useEffect, useRef, useState } from "react";
import { useCoinQuery } from "@/hooks/useCoinQuery";

import { HTMLReactParserOptions, Element } from "html-react-parser";
import parse from "html-react-parser";
import { cn } from "@/utils/cn";

type Props = {
  response: ReturnType<typeof useCoinQuery>;
};

const CoinOverviewDescription = ({ response }: Props) => {
  const description = response.data?.description.en;

  const [canExpand, setCanExpand] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const expandRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (expandRef.current?.scrollHeight) {
      setCanExpand(
        expandRef.current.scrollHeight > 300 &&
          expandRef.current.scrollHeight <= 700
      );
    }
  }, [response, canExpand, setCanExpand]);

  const parserOptions: HTMLReactParserOptions = {
    replace(domNode) {
      // sanitize anchor tags from response
      if (domNode instanceof Element && domNode.name === "a") {
        const child = domNode.children[0];
        return <span>{child.type === "text" ? child.data : null}</span>;
      }
    },
  };

  // Differentiate between two cases:
  // 1) The response has not loaded yet
  // 2) The response has loaded but there's just no description
  const descriptionDisplay = (() => {
    if (response.isPending) return "Loading description...";
    return description
      ? parse(description.replaceAll("\n", "<br/>"), parserOptions)
      : "No description provided.";
  })();

  return (
    <div>
      <div ref={expandRef} className="relative w-[700px] overflow-hidden">
        <p
          className={cn(
            isExpanded
              ? "h-auto bg-inherit"
              : "bg-[linear-gradient(to_bottom,white_50%,transparent_100%)] bg-clip-text text-transparent h-[300px]"
          )}
        >
          {descriptionDisplay}
        </p>
      </div>
      {canExpand && (
        <button
          className="mb-[20vh] hover:underline hover:underline-offset-[6px] text-menu-highlight/80"
          onClick={() =>
            isExpanded ? setIsExpanded(false) : setIsExpanded(true)
          }
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default CoinOverviewDescription;
