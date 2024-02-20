import NextThemeProvider from "./NextThemeProvider";
import TanstackProvider from "./TanstackProvider";

const ProvidersMaster = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemeProvider defaultTheme="dark" attribute="class">
      <TanstackProvider>{children}</TanstackProvider>
    </NextThemeProvider>
  );
};

export default ProvidersMaster;
