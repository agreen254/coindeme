/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {
    "lucide-react": {
      transform: "lucide-react/{{member}}",
      skipDefaultConversion: true,
      preventFullImport: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.coingecko.com",
        port: "",
        pathname: "/coins/images/**",
      },
    ],
  },
};

export default nextConfig;
