import * as WebBrowser from "expo-web-browser";
import { useCallback, useEffect } from "react";
import { Button } from "react-native";
import { useOAuth, useUser } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "./hooks/warmUpBrowser";
import { Redirect, useRouter } from "expo-router";
WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  const { isLoading, isSignedIn, user } = useUser();
  useWarmUpBrowser();
  const router = useRouter();
  const { startOAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });

  const onPress = useCallback(async () => {
    try {
      const {
        createdSessionId,
        signIn,
        signUp,
        setActive,
      } = await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
        console.log("OAuth success", createdSessionId);
      } else {
        // Use signIn or signUp for next steps such as MFA
        router.replace("/");
        // return <Redirect href="/" />;
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  useEffect(() => {
    console.log("isSignedIn", isSignedIn);
    if (isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn]);

  return (
    <Button title="Sign in with Google" onPress={onPress} />
  );
}
