import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // The CLI child process returns empty captured stdout in this local Node 24
    // environment. TypeScript 6 still provides the compiler API used here.
    useTypeScriptCli: false,
  },
};

export default nextConfig;
