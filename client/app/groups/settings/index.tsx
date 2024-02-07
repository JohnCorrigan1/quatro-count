import {
  Stack,
  useLocalSearchParams,
  Link,
  useNavigation,
} from "expo-router";
import {
  View,
  Text,
  Pressable,
  useColorScheme,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import { basestyles } from "../../lib/staticStyles";

export default function GroupSettingsPage() {
  const { gid } = useLocalSearchParams();
  console.log("gid", gid);
  const colorScheme = useColorScheme();
  const parentLayout = useNavigation(`/groups`);

  return (
    <>
      <Stack.Screen
        options={{
          title: "settings",
        }}
      />
      <View style={basestyles.container}>
        <Text style={basestyles.title}>Group Settings</Text>
        <Text style={basestyles.title}>{gid}</Text>
      </View>
    </>
  );
}
