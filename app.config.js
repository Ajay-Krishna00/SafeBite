import "dotenv/config";

export default ({ config }) => ({
  ...config,
  name: "SafeBite",
  slug: "safeBite",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/logos.png",
  scheme: "safebite",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.ajaykd021.safeBite",
    infoPlist: {
      NSCameraUsageDescription: "This app uses the camera to scan barcodes.",
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/logos.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
    permissions: ["CAMERA"],
    package: "com.ajaykd021.safeBite",
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/logos.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/logos.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  assetBundlePatterns: ["**/*"],
  extra: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    eas: {
      projectId: "e566b827-4513-46eb-ba27-e31db8cc5ddd",
    },
  },
});
