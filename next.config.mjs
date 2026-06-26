/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  experimental: {
    optimizePackageImports: ["neobrutalism-ui-react", "date-fns"]
  }
};

export default nextConfig;
