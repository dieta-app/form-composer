const babelConfig = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: { browsers: ["last 1 versions"] }
      }
    ],
    "@babel/preset-react",
    ["module:metro-react-native-babel-preset"]
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-modules-commonjs",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
    "inline-import-data-uri",
    ["inline-json", {}],
    [
      "babel-plugin-styled-components",
      {
        fileName: false
      }
    ]
  ]
};

module.exports = babelConfig;
