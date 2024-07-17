export default {
  expo: {
    name: "github-mobile",
    slug: "github-mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/GitPeekIcon.png",
    scheme: "githubmobile",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/GitPeekIcon.png",
      resizeMode: "contain",
      backgroundColor: "#0F0E2E"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/GitPeekIcon.png",
        backgroundColor: "#0F0E2E"
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
      router: {
        origin: false
      },
      eas: {
        projectId: "0884cfa4-14f0-47a6-823f-97f3b824fe50"
      }
    }
  }
};
