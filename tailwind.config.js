var paths = ["./pages/**/*.js", "./components/**/*.js"];

module.exports = {
  purge: {
    mode: "layers",
    layers: ["base", "components", "utilities"],
    content: paths,
  },
  // purge: paths,
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
