import type { Metadata } from "next";

import HolyLoader from "holy-loader";
import { Open_Sans as OpenSans } from "next/font/google";

import NavBar from "@/components/NavBar/NavBar";
import ProvidersMaster from "@/providers/ProvidersMaster";
import ToastContainer from "@/components/Toast/ToastContainer";

import "./globals.css";

const openSans = OpenSans({ subsets: ["latin", "greek"] });

export const metadata: Metadata = {
  title: "CoinDeme",
  description: "Aaron Green's implementation of the crypto app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <HolyLoader height="2px" />
      <body
        className={`${openSans.className} bg-zinc-100 dark:bg-black dark:bg-grad-dark min-h-screen overflow-y-scroll`}
      >
        <ProvidersMaster>
          <NavBar />
          <ToastContainer />
          {children}
        </ProvidersMaster>
      </body>
    </html>
  );
}
