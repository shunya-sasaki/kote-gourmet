import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: process.env.NODE_ENV === "development" ? "" : "/kote-gourmet",
  assetPrefix: process.env.NODE_ENV === "development" ? "" : "/kote-gourmet",
};

export default nextConfig;
