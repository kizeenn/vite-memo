const plugin = require("tailwindcss/plugin");

const rotateY = plugin(function ({ addUtilities }) {
  addUtilities({
    ".rotate-y-180": {
      transform: "rotateY(180deg)",
    },
  });
});

const backfaceVisibility = plugin(function ({ addUtilities }) {
  addUtilities({
    ".backface-visible": {
      "backface-visibility": "visible",
    },
    ".backface-hidden": {
      "backface-visibility": "hidden",
    },
  });
});

const transformStyle = plugin(function ({ addUtilities }) {
  addUtilities({
    ".transform-preserve": {
      "transform-style": "preserve-3d",
    },
  });
});

const perspective = plugin(function ({ addUtilities }) {
  addUtilities({
    ".perspective-1k": {
      perspective: "1000px",
    },
  });
});

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      body: ["Helvetica"],
    },
  },
  plugins: [rotateY, backfaceVisibility, transformStyle, perspective],
};
