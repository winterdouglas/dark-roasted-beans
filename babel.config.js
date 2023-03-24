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
          "@components": "./src/components",
          "@config": "./src/config",
          "@features": "./src/features",
          "@hooks": "./src/hooks",
          "@lib": "./src/lib",
          "@navigation": "./src/navigation",
          "@screens": "./src/screens",
          "@services": "./src/services",
          "@theme": "./src/theme",
          "@utils": "./src/utils",
        },
      },
    ],
  ],
};
