import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async rewrites() {
    return [
      { source: "/mail", destination: "/mail/airmail.html" },
      { source: "/mail/:friend(con|minette|imee|jaira)", destination: "/mail/airmail.html" },
      { source: "/mail/barkada", destination: "/mail/barkada.html" },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.wordpress.com",
      },
      {
        protocol: "https",
        hostname: "**.wp.com",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
    ],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
