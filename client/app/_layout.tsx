import FontAwesome from "@expo/vector-icons/FontAwesome";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import {
  SplashScreen,
  Stack,
  useNavigation,
  useRouter,
} from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import ClerkProvider from "./ClerkProvider";

const queryClient = new QueryClient();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider
            value={
              colorScheme === "dark"
                ? DarkTheme
                : DefaultTheme
            }>
            <Stack>
              <Stack.Screen
                name="(tabs)"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="login" />
              <Stack.Screen name="createaccount" />
              <Stack.Screen
                name="modal"
                options={{ presentation: "modal" }}
              />
              <Stack.Screen
                name="newgroup"
                options={{ presentation: "modal" }}
              />
              <Stack.Screen name="invite" />
              <Stack.Screen
                name="group"
                options={{
                  headerShown: false,
                  headerTitle: "Grouper",
                  headerBackTitle: "Groups",
                }}
              />
            </Stack>
          </ThemeProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
