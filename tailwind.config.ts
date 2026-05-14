import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "-apple-system", "sans-serif"],
      },
      colors: {
        "bg-page": "var(--color-bg-page)",
        "bg-surface": "var(--color-bg-surface)",
        "bg-sunken": "var(--color-bg-sunken)",
        "bg-sidebar": "var(--color-bg-sidebar)",
        "bg-sidebar-hover": "var(--color-bg-sidebar-hover)",
        "bg-sidebar-active": "var(--color-bg-sidebar-active)",
        "border-default": "var(--color-border-default)",
        "border-subtle": "var(--color-border-subtle)",
        "border-strong": "var(--color-border-strong)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        "text-inverted": "var(--color-text-inverted)",
        "text-sidebar": "var(--color-text-sidebar)",
        "text-sidebar-active": "var(--color-text-sidebar-active)",
        "accent-primary": "var(--color-accent-primary)",
        "accent-ai": "var(--color-accent-ai)",
        "accent-ai-bg": "var(--color-accent-ai-bg)",
        "accent-ai-border": "var(--color-accent-ai-border)",
        "status-success": "var(--color-status-success)",
        "status-success-bg": "var(--color-status-success-bg)",
        "status-warning": "var(--color-status-warning)",
        "status-warning-bg": "var(--color-status-warning-bg)",
        "status-danger": "var(--color-status-danger)",
        "status-danger-bg": "var(--color-status-danger-bg)",
        "status-info": "var(--color-status-info)",
        "status-info-bg": "var(--color-status-info-bg)",
        "focus-ring": "var(--color-focus-ring)",
        "navy-50": "var(--navy-50)",
        "navy-700": "var(--navy-700)",
        gold: {
          400: "var(--gold-400)",
          600: "var(--gold-600)",
        },
      },
      transitionDuration: {
        DEFAULT: "150ms",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0, 0, 0.2, 1)",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.04)",
      },
    },
  },
  plugins: [],
};
export default config;
