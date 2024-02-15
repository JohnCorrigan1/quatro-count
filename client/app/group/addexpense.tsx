import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { View } from "../../components/Themed";
import { ExpenseForm } from "../../components/ExpenseForm";

export default function ModalScreen() {
  return (
    <View>
      <ExpenseForm />
      <StatusBar
        style={Platform.OS === "ios" ? "light" : "auto"}
      />
    </View>
  );
}
