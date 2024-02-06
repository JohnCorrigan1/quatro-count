import { ClerkProvider as BaseClerkProvider } from "@clerk/clerk-react";

export default function ClerkProvider({ children }) {
  return (
    <BaseClerkProvider
      publishableKey={
        process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
      }>
      {children}
    </BaseClerkProvider>
  );
}
