import { View, Text } from "react-native";
import { basestyles } from "@lib/staticStyles";
import SignIn from "./ClerkSignIn";

export default function LoginScreen() {
  return (
    <View style={basestyles.container}>
      <SignIn />
    </View>
  );
}
