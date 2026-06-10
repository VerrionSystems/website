import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b1728",
        muted: "#5f6f86",
        line: "#d9e3ef",
        surface: "#f7faff",
        navy: "#0a2540",
        verrion: {
          blue: "#1d4ed8",
          cyan: "#0e7490",
          teal: "#0f766e",
          green: "#15803d",
          amber: "#b45309",
        },
      },
      boxShadow: {
        panel: "0 24px 70px rgba(15, 35, 65, 0.12)",
        soft: "0 12px 40px rgba(15, 35, 65, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
