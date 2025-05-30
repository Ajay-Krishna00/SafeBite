const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { wrapWithReanimatedMetroConfig } = require("react-native-reanimated/metro-config");

// Step 1: Start with Expo's default config
let config = getDefaultConfig(__dirname);

// Step 2: Add NativeWind support
config = withNativeWind(config, { input: "./app/global.css" });

// Step 3: Add Reanimated support
config = wrapWithReanimatedMetroConfig(config);

// Step 4: Export the final config
module.exports = config;
