/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "320px",
      // => @media (min-width: 320px) { ... }

      sm: "768px",
      // => @media (min-width: 768px) { ... }

      md: "1024px",
      // => @media (min-width: 1024px) { ... }

      lg: "1280px",
      // => @media (min-width: 1280px) { ... }

      xl: "1440px",
      // => @media (min-width: 1440px) { ... }
    },
    colors: {
      transparent: "transparent",
      r50: "#fceaea",
      r75: "#f4aba8",
      r100: "#ef8883",
      r200: "#e9544e",
      r300: "#e4312a",
      r400: "#a0221d",
      r500: "#8b1e1a",
      b0: "#fff",
      b10: "#fbfbfb",
      b20: "#f7f6f6",
      b30: "#eeeded",
      b40: "#e3e2e2",
      b50: "#cac8c8",
      b60: "#bdbaba",
      b70: "#b3afaf",
      b80: "#a6a2a2",
      b90: "#999595",
      b100: "#8d8888",
      b200: "#807a7a",
      b300: "#736d6d",
      b400: "#686262",
      b500: "#5c5555",
      b600: "#514a4a",
      b700: "#423a3a",
      b800: "#362d2d",
      b900: "#2b2222",
    },
    margin: {
      0: "0", //0px
      "0five": "0.5rem", //8px
      1: "1rem", //16px
      "1five": "1.5rem", //24px
      2: "2rem", //32px
      "2five": "2.5rem", //40px
      4: "4rem", //64px
      "4five": "4.5rem", //72px
      "7five": "7.5rem", //120px
    },

    padding: {
      0: "0", //0px
      "0twofive": "0.25rem", //4px
      "0five": "0.5rem", //8px
      1: "1rem", //16px
      "1five": "1.5rem", //24px
      2: "2rem", //32px
      "2five": "2.5rem", //40px
      4: "4rem", //64px
      "4five": "4.5rem", //72px
      "7five": "7.5rem", //120px
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      inset: {
        1: "1rem", //16px
        "1five": "1.5rem", //24px
        4: "4rem", //64px
        "4five": "4.5rem", //72px
        6: "6rem", //96px
      },
      gap: {
        0: "0", //0px
        "0five": "0.5rem", //8px
        1: "1rem", //16px
        "1five": "1.5rem", //24px
        2: "2rem", //32px
        "2five": "2.5rem", //40px
        4: "4rem", //64px
        "7five": "7.5rem", //120px
      },
      minWidth: {
        0: "0", //0px
        "0five": "0.5rem", //8px
        1: "1rem", //16px
        "1twofive": "1.25rem", //20px
        "1five": "1.5rem", //24px
        2: "2rem", //32px
        "2five": "2.5rem", //40px
        4: "4rem", //64px
        "6twofive": "6.25rem", //100px
        "7five": "7.5rem", //120px
        "8sevenfive": "8.75rem", //140px
        12: "12rem", //192px
        15: "15rem", //240px
        20: "20rem", //320px
        24: "24rem", //384px
        50: "50rem", //800px
        90: "90rem", //1440px
      },
      width: {
        0: "0", //0px
        "0five": "0.5rem", //8px
        1: "1rem", //16px
        "1twofive": "1.25rem", //20px
        "1five": "1.5rem", //24px
        2: "2rem", //32px
        "2five": "2.5rem", //40px
        4: "4rem", //64px
        "6twofive": "6.25rem", //100px
        "7five": "7.5rem", //120px
        10: "10rem", // 160px
        12: "12rem", //192px
        15: "15rem", //240px
        20: "20rem", //320px
        24: "24rem", //384px
        50: "50rem", //800px
        90: "90rem", //1440px
      },
      backgroundImage: {
        "hero-pattern":
          "var(--gradient-liniear-top, linear-gradient(180deg, #2b2222 0%, rgba(0, 0, 0, 0.00) 15.94%))",
      },
      minHeight: {
        0: "0", //0px
        "0five": "0.5rem", //8px
        1: "1rem", //16px
        "1twofive": "1.25rem", //20px
        "1five": "1.5rem", //24px
        2: "2rem", //32px
        "2five": "2.5rem", //40px
        4: "4rem", //64px
        "6twofive": "6.25rem", //100px
        "7five": "7.5rem", //120px
        "8sevenfive": "8.75rem", //140px
        12: "12rem", //192px
        15: "15rem", //240px
        20: "20rem", //320px
        24: "24rem", //384px
        50: "50rem", //800px
        90: "90rem", //1440px
      },
      height: {
        hero: "480px",
        0: "0", //0px
        "0five": "0.5rem", //8px
        1: "1rem", //16px
        "1twofive": "1.25rem", //20px
        "1five": "1.5rem", //24px
        2: "2rem", //32px
        "2five": "2.5rem", //40px
        4: "4rem", //64px
        "6twofive": "6.25rem", //100px
        "7five": "7.5rem", //120px
        12: "12rem", //192px
        15: "15rem", //240px
        20: "20rem", //320px
        24: "24rem", //384px
        30: "30rem", //480px
        50: "50rem", //800px
        90: "90rem", //1440px
      },
      borderRadius: {
        1: "1rem", //16px
      },
      boxShadow: {
        nav: "0px 4px 4px 0px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
