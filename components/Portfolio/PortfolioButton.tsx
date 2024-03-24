const PortfolioButton = () => {
  return (
    <div className="w-[264px] h-12 flex justify-center items-center gap-x-1 rounded-full font-medium bg-white/10 shadow-top shadow-menu-highlight/30">
      <span className="w-[120px] h-8 flex justify-center items-center rounded-full bg-[#5B9ACA]/80 shadow-[0_0_20px_8px] shadow-[#7878FA]/20">
        <span>Coins</span>
      </span>
      <span className="w-[120px] h-8 flex justify-center items-center rounded-full">
        Portfolio
      </span>
    </div>
  );
};

export default PortfolioButton;
