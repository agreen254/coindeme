"use client";

import { HTMLReactParserOptions, Element } from "html-react-parser";
import parse from "html-react-parser";

import { useCoinQuery } from "@/hooks/useCoinQuery";

type Props = {
  response: ReturnType<typeof useCoinQuery>;
};

const CoinOverviewDescription = ({ response }: Props) => {
  const description = response.data?.description.en;

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
    <div className="mt-8 col-span-1 screen-xl:col-span-2">
      <p>{descriptionDisplay}</p>
    </div>
  );
};

export default CoinOverviewDescription;
