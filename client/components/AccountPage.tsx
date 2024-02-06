import { View, Text } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { Button } from "react-native-elements";
import { useRouter } from "expo-router";

export const AccountPage = () => {
  const { isLoaded, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    if (!isLoaded) {
      return;
    }
    await signOut();
    router.replace("/login");
  };

  return (
    <View>
      <Text>Account page</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};
