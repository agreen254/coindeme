"use client";

import { useState } from "react";

// import { useAnalysisActions, useAnalysisSeries } from "@/hooks/useAnalysis";
import DropdownProvider from "@/providers/DropdownProvider";
// import { initializeNewDropdown } from "@/hooks/useDropdownStore";

// import DropdownMenu from "../Dropdown/DropdownMenu";
// import DropdownMenuItem from "../Dropdown/DropdownMenuItem";
import Panel from "../Theme/Panel";
import { initializeNewDropdown } from "@/hooks/useDropdownStore";

type Props = {
  initId: string | undefined;
};

const AnalysisRow = ({ initId }: Props) => {
  //   const { addSeries, removeSeriesById } = useAnalysisActions();
  //   const series = useAnalysisSeries();

  const [id, setId] = useState<string>(initId ?? "");
  const unit = [initializeNewDropdown("analysisCoin")];

  return (
    <DropdownProvider initialUnits={unit}>
      <Panel className="w-full flex">
        <input
          type="text"
          placeholder="coin"
          value={id}
          onChange={(e) => setId(e.currentTarget.value)}
        />
      </Panel>
    </DropdownProvider>
  );
};

export default AnalysisRow;
