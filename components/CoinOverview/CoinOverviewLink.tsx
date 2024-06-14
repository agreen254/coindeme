import { Copy as CopyIcon } from "lucide-react";
import { CopyCheck as CopyCheckIcon } from "lucide-react";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import { cn } from "@/utils/cn";

import Panel from "../Theme/Panel";

type Props = {
  link: string | null | undefined;
  isLoading: boolean;
  className?: string;
};

const CoinOverviewLink = ({ className, link, isLoading }: Props) => {
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  // reset checked copy to regular after use clicks it
  useEffect(() => {
    if (hasCopied) {
      setTimeout(() => {
        setHasCopied(false);
      }, 2 * 1000);
    }
  }, [hasCopied, setHasCopied]);

  return (
    <Panel className={cn(isLoading && "animate-pulse", className)}>
      <div className="w-full flex justify-center items-center">
        {link && (
          <>
            <Link href={link} target="_blank">
              <LinkIcon className="w-5 h-5 mr-5 inline" />
            </Link>
            <p className="max-w-[calc(100%-120px)] overflow-clip overflow-ellipsis">
              {link}
            </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(link);
                setHasCopied(true);
                toast.success("Link copied");
              }}
            >
              {hasCopied ? (
                <CopyCheckIcon className="w-5 h-5 ml-5 inline" />
              ) : (
                <CopyIcon className="w-5 h-5 ml-5 inline" />
              )}
              <span className="sr-only">copy link</span>
            </button>
          </>
        )}
      </div>
    </Panel>
  );
};

export default CoinOverviewLink;
