import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
            // background: "#ffffff",
            // foreground: "#000000",
            primary: {
              foreground: "#ffffff",
              DEFAULT: "#F5A524",
            },
          },
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            primary: {
              DEFAULT: "#F5A524",
            },
          }, // dark theme colors
        },
      },
    }),
  ],
} satisfies Config;
