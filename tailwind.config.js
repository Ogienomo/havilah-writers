/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      /* ==============================
         BRAND COLOURS
      ============================== */
      colors: {
        brand: {
          dark: "#0f172a",   // deep navy (primary text)
          gold: "#c9a24d",   // elegant accent
          soft: "#f8fafc",   // off-white background
          muted: "#64748b",  // secondary text
          line: "#e5e7eb",   // borders & dividers
        },
      },

      /* ==============================
         TYPOGRAPHY
      ============================== */
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },

      /* ==============================
         ANIMATIONS
      ============================== */
      animation: {
        fade: "fade 1.2s ease-out both",
        float: "float 6s ease-in-out infinite",
        pulseSoft: "pulseSoft 3s ease-in-out infinite",
      },

      keyframes: {
        fade: {
          "0%": {
            opacity: "0",
            transform: "translateY(12px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },

        pulseSoft: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.6",
          },
        },
      },

      /* ==============================
         LAYOUT TUNING
      ============================== */
      maxWidth: {
        content: "80rem",
      },

      letterSpacing: {
        wideSoft: "0.08em",
      },

      boxShadow: {
        soft: "0 8px 24px rgba(15, 23, 42, 0.06)",
        gold: "0 8px 20px rgba(201, 162, 77, 0.25)",
      },
    },
  },

  plugins: [],
};
