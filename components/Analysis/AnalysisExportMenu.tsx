"use client";

import { Download as DownloadIcon } from "lucide-react";
import { ANALYSIS_EXPORT_FORMATS } from "@/validation/defaults";

type Props = {
  downloadCallback: (_format: string) => void;
};

const AnalysisExportMenu = ({ downloadCallback }: Props) => {
  function handleExport(e: React.ChangeEvent<HTMLSelectElement>) {
    const exportFormat = e.currentTarget.value;
    downloadCallback(exportFormat); // specify format here
  }

  return (
    <>
      <DownloadIcon className="absolute w-5 h-5 top-2 left-3 inline" />
      <label htmlFor="export" className="sr-only">
        select export format
      </label>
      <select
        onChange={handleExport}
        name="selectedFormat"
        value="export"
        id="export"
        className="p-2 pl-8 uppercase text-xs screen-sm:text-sm border border-zinc-200 dark:border-zinc-700 rounded-sm"
      >
        <option value="export" disabled>
          export as
        </option>
        {ANALYSIS_EXPORT_FORMATS.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>
    </>
  );
};

export default AnalysisExportMenu;
