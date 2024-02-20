import type { Metadata } from "next";

import { Open_Sans as OpenSans } from "next/font/google";
import "./globals.css";

import NavBar from "@/components/NavBar/NavBar";
import ProvidersMaster from "@/providers/ProvidersMaster";

const openSans = OpenSans({ subsets: ["latin", "greek"] });

export const metadata: Metadata = {
  title: "Crypto App",
  description: "Aaron Green's implementation of the crypto app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${openSans.className} dark:bg-grad-dark min-h-screen overflow-y-scroll`}>
        <ProvidersMaster>
          <NavBar />
          {children}
        </ProvidersMaster>
      </body>
    </html>
  );
}
