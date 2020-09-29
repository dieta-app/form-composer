module.exports = {
  collectCoverageFrom: ["src/**/*.js", "!src/**/*.story.js"],
  coveragePathIgnorePatterns: ["node_modules"],
  coverageReporters: ["text", "html"],
  testMatch: ["**/*.test.js"],
  setupTestFrameworkScriptFile: "./test/config.js",
  testEnvironment: "jest-environment-jsdom-global",
  testURL: "http://localhost/",
  testPathIgnorePatterns: ["node_modules", "dist"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(scss|sass|css)$": "identity-obj-proxy"
  }
};
