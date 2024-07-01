type Props = {
  color: string;
};

const AnalysisLineColorPreview = ({ color }: Props) => {
  return (
    <div
      className="inline w-8 h-[6px] mr-2"
      style={{ backgroundColor: color }}
    ></div>
  );
};

export default AnalysisLineColorPreview;
