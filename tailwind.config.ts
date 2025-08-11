import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bounceOnly: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "fade-out": "fadeOut 0.5s ease forwards",
        "fade-in-bounce":
          "fadeIn 0.5s ease forwards, bounceOnly 1.4s ease-in-out infinite",
        "fade-in-delayed": "fadeIn 0.8s ease forwards 0.3s",
      },

      // MINU Design System - Grid
      maxWidth: {
        mobile: "375px", // MINU 디바이스 너비
        content: "335px", // MINU 콘텐츠 너비
        tablet: "768px", //  최대 너비
      },
      minWidth: {
        mobile: "375px", // 최소 너비
      },
      screens: {
        mobile: "375px",
        tablet: "768px",
        desktop: "1024px",
      },
      // MINU Design System - Spacing (4-Point Grid)
      spacing: {
        "0": "0px",
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "5": "20px",
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

      // MINU Design System - Colors (Updated)
      colors: {
        // Gray Scale
        gray: {
          50: "#F9FAFB",
          100: "#F2F4F6",
          200: "#E5E8EB",
          300: "#D1D6DB",
          400: "#B0B8C1",
          500: "#8B95A1",
          600: "#6B7684",
          700: "#4E5968",
          800: "#4E5968",
          900: "#191F28",
        },
        // Blue Scale
        blue: {
          50: "#E8F3FF",
          100: "#C9E2FF",
          200: "#90C2FF",
          300: "#64A8FF",
          400: "#4593FC",
          500: "#3182F6",
          600: "#2272EB",
          700: "#1B64DA",
          800: "#1957C2",
          900: "#194AA6",
        },
        // Red Scale
        red: {
          50: "#FFEEEE",
          100: "#FFD4D6",
          200: "#FEAFB4",
          300: "#FB8890",
          400: "#F66570",
          500: "#F04452",
          600: "#E42939",
          700: "#D22030",
          800: "#BC1B2A",
          900: "#A51926",
        },
        // Orange Scale
        orange: {
          50: "#FFF9E7",
          100: "#FFEFBF",
          200: "#FFE69B",
          300: "#FFDD78",
          400: "#FFC342",
          500: "#FFC342",
          600: "#FFB331",
          700: "#FAA131",
          800: "#EE8F11",
          900: "#DD7D02",
        },
        // Green Scale
        green: {
          50: "#F0FAF6",
          100: "#AEEFD5",
          200: "#76E4B8",
          300: "#3FD599",
          400: "#15C47E",
          500: "#02A262",
          600: "#02A262",
          700: "#029359",
          800: "#028450",
          900: "#027648",
        },
        // Teal Scale
        teal: {
          50: "#EDF8F8",
          100: "#BCE9E9",
          200: "#89D8D8",
          300: "#58C7C7",
          400: "#30B6B6",
          500: "#18A5A5",
          600: "#109595",
          700: "#0C8585",
          800: "#097575",
          900: "#076565",
        },
        // Purple Scale
        purple: {
          50: "#F9F0FC",
          100: "#EDCCF8",
          200: "#DA9BEF",
          300: "#C770E4",
          400: "#B44BD7",
          500: "#A234C7",
          600: "#9128B4",
          700: "#8222A2",
          800: "#73228E",
          900: "#65237B",
        },
        // Semantic Colors
        white: "#FFFFFF",
        "grey-background": "#F8F9FA",
        "layered-background": "#F1F3F5",
        "floated-background": "#E9ECEF",
        "dim-background": "rgba(0, 0, 0, 0.2)",
        "border-hairline": "#E9ECEF",
        // MINU Brand Colors
        primary: "#557AF3", // 메인 컬러
        secondary: "#839DF1", // secondary 컬러
        point: "#B1C1FF",
        "light-blue": "#B1C1FF", // light blue 컬러
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
  plugins: [
    ({
      addComponents,
    }: {
      addComponents: (
        components: Record<
          string,
          Record<string, string | Record<string, string>>
        >
      ) => void;
    }) => {
      addComponents({
        ".btn-main": {
          "@apply px-2.5 py-3.5 rounded-xl font-semibold text-base leading-normal tracking-tight h-[52px]":
            {},
        },
        ".btn-medium": {
          "@apply px-2.5 py-3 rounded-[10px] font-medium text-sm leading-tight tracking-tight h-[44px]":
            {},
        },
        ".btn-small": {
          "@apply px-3 py-2 rounded-[46px] font-medium text-xs leading-none tracking-tight h-[32px]":
            {},
        },
        ".btn-extra-small": {
          "@apply px-2.5 py-1 rounded font-semibold text-[10px] leading-3 tracking-tight h-[32px]":
            {},
        },
        ".btn-primary": {
          "@apply bg-primary text-white": {},
        },
        ".btn-secondary": {
          "@apply bg-white outline outline-1 outline-offset-[-1px] outline-primary text-primary":
            {},
        },
        ".btn-disabled": {
          "@apply bg-gray-100 text-gray-400 cursor-not-allowed": {},
        },
      });
    },
  ],
};

export default config;
