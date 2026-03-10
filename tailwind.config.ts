import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-alt": "rgb(var(--surface-alt) / <alpha-value>)",
        sand: "rgb(var(--sand) / <alpha-value>)",
        clay: "rgb(var(--clay) / <alpha-value>)",
        terracotta: "rgb(var(--terracotta) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        sage: "rgb(var(--sage) / <alpha-value>)",
        outline: "rgb(var(--outline) / <alpha-value>)",
      },
      fontFamily: {
        body: ["var(--font-body)", "sans-serif"],
        display: ["var(--font-display)", "serif"],
      },
      boxShadow: {
        card: "0 18px 60px -28px rgba(47, 32, 21, 0.28)",
        soft: "0 14px 45px -24px rgba(58, 38, 24, 0.22)",
      },
      borderRadius: {
        organic: "2rem 1.25rem 2.4rem 1.35rem",
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 10% 20%, rgba(214, 141, 98, 0.18), transparent 36%), radial-gradient(circle at 88% 10%, rgba(86, 125, 118, 0.16), transparent 28%), linear-gradient(180deg, rgba(255, 255, 255, 0.76), rgba(255, 255, 255, 0.42))",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(0.5rem, -0.35rem, 0) scale(1.02)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.65" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        drift: "drift 9s ease-in-out infinite",
        glow: "glow 4.5s ease-in-out infinite",
      },
      typography: ({
        theme,
      }: {
        theme: (path: string) => string | string[];
      }) => ({
        DEFAULT: {
          css: {
            maxWidth: "70ch",
            color: theme("colors.ink / 0.88"),
            a: {
              color: theme("colors.terracotta"),
              textDecoration: "none",
              fontWeight: "600",
            },
            h2: {
              color: theme("colors.ink"),
              fontFamily: (theme("fontFamily.display") as string[]).join(", "),
              fontWeight: "600",
            },
            h3: {
              color: theme("colors.ink"),
            },
            strong: {
              color: theme("colors.ink"),
            },
            blockquote: {
              borderLeftColor: theme("colors.clay / 0.45"),
              color: theme("colors.ink / 0.82"),
              fontStyle: "normal",
            },
            code: {
              color: theme("colors.terracotta"),
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
