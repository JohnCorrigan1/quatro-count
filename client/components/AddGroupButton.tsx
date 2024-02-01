import {
  Pressable,
  useColorScheme,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import Colors from "../constants/Colors";

export const AddGroupButton = () => {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    addGroup: {
      display: "flex",
      position: "absolute",
      bottom: 50,
      right: 30,
      borderRadius: 50,
      height: 60,
      width: 60,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors[colorScheme ?? "light"].tint,
    },
  });
  return (
    <Link style={styles.addGroup} href="/newgroup" asChild>
      <Pressable>
        {({ pressed }) => (
          <FontAwesome
            name="plus"
            size={32}
            color={Colors[colorScheme ?? "light"].text}
          />
        )}
      </Pressable>
    </Link>
  );
};
