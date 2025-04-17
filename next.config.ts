import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['leaflet'],
  domains: ['superstar-jumbo.vercel.app'],
};

export default withPayload(nextConfig);
