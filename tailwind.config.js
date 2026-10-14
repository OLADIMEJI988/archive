module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { ink: { 850: "#1a1a1a", 950: "#0f0f0f" } },
    letterSpacing: { display: "-0.06em" },
    spacing: { "4.5": "18px" },
  } },
  plugins: [],
};
