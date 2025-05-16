import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.css",
  ],
  theme: {
    extend: {
      animation: {
        "text-gradient": "text-gradient 1.5s linear infinite",
      },
      keyframes: {
        "text-gradient": {
          to: { backgroundPosition: "200% center" },
        },
      },
      fontFamily: {
        sans: ['"DM Sans"'],
      },
    },
  },
  plugins: [],
} satisfies Config;
