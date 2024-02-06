import { ClerkProvider as BaseClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";

export default function ClerkProvider({ children }) {
  const tokenCache = {
    async getToken(key) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key, value) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };
  return (
    <BaseClerkProvider
      tokenCache={tokenCache}
      publishableKey={
        process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
      }>
      {children}
    </BaseClerkProvider>
  );
}
