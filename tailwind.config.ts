import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F5F5F5",
        gray: "#ACACAC",
      },
      borderRadius: {
        full: "30px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
