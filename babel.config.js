/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [
          ".ios.js",
          ".android.js",
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
          ".json",
        ],
        alias: {
          "^@/(.+)": "./src/\\1",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
