import { StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { basestyles } from "../lib/staticStyles";

export default function AccountScreen() {
  return (
    <View style={basestyles.container}>
      <Text style={basestyles.title}>Account page</Text>
    </View>
  );
}
