import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        autumn: {
          taupe: "#8C7A6B",
          terracotta: "#C86D51",
          olive: "#556B2F",
          sand: "#F7F4EF",
          charcoal: "#2B2927",
          cream: "#FAF8F5",
        },
      },
    },
  },
  plugins: [],
};
export default config;