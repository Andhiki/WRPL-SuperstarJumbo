import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import path from 'path'

const nextConfig: NextConfig = {
  transpilePackages: ['leaflet'],
  images: {
    domains: ['superstar-jumbo.vercel.app'],
  },
  
  webpack: (config) => {
    config.resolve.alias['@payload-config'] = path.resolve(__dirname, 'src/payload.config.ts')
    return config
  }
};

export default withPayload(nextConfig);
