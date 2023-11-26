import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import {
  Link,
  Stack,
  useLocalSearchParams,
} from "expo-router";
export default function GroupPage() {
  const { group } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ title: group.toString() }} />
      <View style={styles.page}>
        <Expenses />
        <Expenses />
        <Expenses />
      </View>
    </>
  );
}

function Expenses() {
  return (
    <View>
      <Text>Expenses</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
