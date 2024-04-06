import { Metadata } from "next";
import PortfolioWrapper from "@/components/Portfolio/PortfolioWrapper";

export const metadata: Metadata = {
  title: "My Portfolio",
};

const PortfolioPage = () => {
  return <PortfolioWrapper />;
};

export default PortfolioPage;
