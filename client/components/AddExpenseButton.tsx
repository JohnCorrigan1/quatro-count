import { Link } from "expo-router";
import {
  Pressable,
  useColorScheme,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@constants/Colors";

export const AddExpenseButton = () => {
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
      backgroundColor:
        Colors[colorScheme ?? "light"].tabIconSelected,
    },
  });

  return (
    <Link
      style={styles.addGroup}
      href="/group/addexpense"
      asChild>
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
