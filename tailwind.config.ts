import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // MINU Design System - Grid
      maxWidth: {
        mobile: "375px", // MINU 디바이스 너비
        content: "335px", // MINU 콘텐츠 너비
      },
      screens: {
        mobile: "375px",
        tablet: "768px",
        desktop: "1024px",
      },
      // MINU Design System - Spacing (4-Point Grid)
      spacing: {
        "0": "0px",
        "1": "2px",
        "2": "4px",
        "3": "8px",
        "4": "12px",
        "5": "16px",
        "6": "20px",
        "7": "24px",
        "8": "28px",
        "9": "32px",
        "10": "36px",
        "screen-margin": "20px", // MINU 스크린 마진
        gutter: "16px", // MINU 컬럼 간격
      },

      // MINU Design System - Typography
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
        pretendard: ["Pretendard", "sans-serif"],
      },
      fontSize: {
        // Display
        "display-1": [
          "56px",
          { lineHeight: "72px", letterSpacing: "-0.0319em" },
        ],
        "display-2": [
          "40px",
          { lineHeight: "52px", letterSpacing: "-0.0282em" },
        ],
        // Title
        "title-1": ["36px", { lineHeight: "48px", letterSpacing: "-0.027em" }],
        "title-2": ["32px", { lineHeight: "42px", letterSpacing: "-0.02em" }],
        "title-3": ["28px", { lineHeight: "38px", letterSpacing: "-0.0236em" }],
        "title-4": ["24px", { lineHeight: "32px", letterSpacing: "-0.023em" }],
        // Heading
        "heading-1": [
          "22px",
          { lineHeight: "30px", letterSpacing: "-0.0194em" },
        ],
        "heading-2": [
          "20px",
          { lineHeight: "28px", letterSpacing: "-0.012em" },
        ],
        "headline-1": [
          "18px",
          { lineHeight: "26px", letterSpacing: "-0.002em" },
        ],
        // Body
        "body-1": ["16px", { lineHeight: "24px", letterSpacing: "0.0057em" }],
        "body-1-reading": [
          "16px",
          { lineHeight: "26px", letterSpacing: "0.0057em" },
        ],
        // Label
        "label-1": ["14px", { lineHeight: "20px", letterSpacing: "0.0145em" }],
        "label-1-reading": [
          "14px",
          { lineHeight: "22px", letterSpacing: "0.0145em" },
        ],
        // Caption
        "caption-1": [
          "12px",
          { lineHeight: "16px", letterSpacing: "0.0252em" },
        ],
        "caption-2": [
          "10px",
          { lineHeight: "14px", letterSpacing: "0.0252em" },
        ],
      },

      // MINU Design System - Colors (Toss Color)
      colors: {
        // Gray Scale
        gray: {
          50: "#F8F9FA",
          100: "#F1F3F5",
          200: "#E9ECEF",
          300: "#DEE2E6",
          400: "#CED4DA",
          500: "#ADB5BD",
          600: "#868E96",
          700: "#495057",
          800: "#343A40",
          900: "#212529",
        },
        // Blue Scale
        blue: {
          50: "#E3F2FD",
          100: "#BBDEFB",
          200: "#90CAF9",
          300: "#64B5F6",
          400: "#42A5F5",
          500: "#2196F3",
          600: "#1E88E5",
          700: "#1976D2",
          800: "#1565C0",
          900: "#0D47A1",
        },
        // Red Scale
        red: {
          50: "#FFEBEE",
          100: "#FFCDD2",
          200: "#EF9A9A",
          300: "#E57373",
          400: "#EF5350",
          500: "#F44336",
          600: "#E53935",
          700: "#D32F2F",
          800: "#C62828",
          900: "#B71C1C",
        },
        // Orange Scale
        orange: {
          50: "#FFF3E0",
          100: "#FFE0B2",
          200: "#FFCC80",
          300: "#FFB74D",
          400: "#FFA726",
          500: "#FF9800",
          600: "#FB8C00",
          700: "#F57C00",
          800: "#EF6C00",
          900: "#E65100",
        },
        // Green Scale
        green: {
          50: "#E8F5E8",
          100: "#C8E6C9",
          200: "#A5D6A7",
          300: "#81C784",
          400: "#66BB6A",
          500: "#4CAF50",
          600: "#43A047",
          700: "#388E3C",
          800: "#2E7D32",
          900: "#1B5E20",
        },
        // Teal Scale
        teal: {
          50: "#E0F2F1",
          100: "#B2DFDB",
          200: "#80CBC4",
          300: "#4DB6AC",
          400: "#26A69A",
          500: "#009688",
          600: "#00897B",
          700: "#00796B",
          800: "#00695C",
          900: "#004D40",
        },
        // Purple Scale
        purple: {
          50: "#F3E5F5",
          100: "#E1BEE7",
          200: "#CE93D8",
          300: "#BA68C8",
          400: "#AB47BC",
          500: "#9C27B0",
          600: "#8E24AA",
          700: "#7B1FA2",
          800: "#6A1B9A",
          900: "#4A148C",
        },
        // Semantic Colors
        white: "#FFFFFF",
        "grey-background": "#F8F9FA",
        "layered-background": "#F1F3F5",
        "floated-background": "#E9ECEF",
        "dim-background": "rgba(0, 0, 0, 0.2)",
        "border-hairline": "#E9ECEF",
      },

      // MINU Design System - Icon Sizes
      width: {
        "icon-xs": "12px",
        "icon-sm": "16px",
        "icon-md": "20px",
        "icon-lg": "24px",
      },
      height: {
        "icon-xs": "12px",
        "icon-sm": "16px",
        "icon-md": "20px",
        "icon-lg": "24px",
      },
    },
  },
  plugins: [],
};

export default config;
