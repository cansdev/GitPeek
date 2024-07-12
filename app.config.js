export default {
  expo: {
    name: "github-mobile",
    slug: "github-mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "githubmobile",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.anonymous.githubmobile",
      networkSecurityConfig: {
        cleartextTrafficPermitted: true
      }
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      "expo-dev-client"
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      apiKey: process.env.EXPO_PUBLIC_API_KEY, // API key from environment variable
      router: {
        origin: false
      },
      eas: {
        projectId: "0884cfa4-14f0-47a6-823f-97f3b824fe50"
      }
    }
  }
};
