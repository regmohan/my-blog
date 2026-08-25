import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    // ensure Next/Turbopack uses the project folder as the root
    root: path.resolve(__dirname),
  },
  reactCompiler: true,
};

export default nextConfig;
