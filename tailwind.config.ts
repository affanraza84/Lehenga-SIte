import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  // @ts-expect-error - safelist is supported at runtime but missing in types
  safelist: [
    "absolute",
    "left-0",
    "bottom-full",
    "mb-2",
    "z-50",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
