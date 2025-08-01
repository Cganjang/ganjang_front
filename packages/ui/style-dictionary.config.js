export default {
  source: ["src/tokens/tokens.json"],
  platforms: {
    scss: {
      transformGroup: "scss",
      buildPath: "styles/build/scss/",
      files: [
        {
          destination: "_variables.scss",
          format: "scss/variables",
        },
      ],
    },
    js: {
      transformGroup: "js",
      buildPath: "styles/build/js/",
      files: [
        {
          destination: "tokens.js", // .ts → .js
          format: "javascript/es6", // typescript/es6 → javascript/es6
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
};
