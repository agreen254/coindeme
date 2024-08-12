type Props = {
  color: string;
};

const AnalysisLineColorPreview = ({ color }: Props) => {
  return (
    <div
      className="min-w-4 w-8 h-[6px] screen-sm:mr-1 mr-2"
      style={{ backgroundColor: color }}
    ></div>
  );
};

export default AnalysisLineColorPreview;
