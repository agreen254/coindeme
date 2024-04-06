import { Metadata } from "next";
import Portfolio from "@/components/Portfolio/Portfolio";

export const metadata: Metadata = {
  title: "My Portfolio",
};

const PortfolioPage = () => {
  return <Portfolio />;
};

export default PortfolioPage;
