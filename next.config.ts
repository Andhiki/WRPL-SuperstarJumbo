import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['leaflet'],
  images: {
    domains: ['superstar-jumbo.vercel.app'],
  },
};

export default withPayload(nextConfig);
