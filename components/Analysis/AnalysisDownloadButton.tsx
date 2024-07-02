import { Download as DownloadIcon } from "lucide-react";

type Props = {
  downloadCallback: () => void;
};

const AnalysisDownloadButton = ({ downloadCallback }: Props) => {
  return (
    <button
      onClick={downloadCallback}
      className="p-2 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 hover:dark:bg-zinc-700 rounded-md"
    >
      <DownloadIcon className="w-5 h-5 inline" />
      <span className="sr-only">download data</span>
    </button>
  );
};

export default AnalysisDownloadButton;
