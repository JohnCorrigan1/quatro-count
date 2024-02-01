import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
} from "react-native";
import Colors from "../constants/Colors";
export const Loading = () => {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    loading: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
    },
    loadingText: {
      fontSize: 20,
      fontWeight: "bold",
      color: Colors[colorScheme ?? "light"].text,
    },
  });
  return (
    <View style={styles.loading}>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};
