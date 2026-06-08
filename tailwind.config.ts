import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        merchant: {
          ink: "#102033",
          blue: "#2563eb",
          mint: "#14b8a6",
          cloud: "#f8fafc"
        }
      }
    }
  },
  plugins: []
};

export default config;
