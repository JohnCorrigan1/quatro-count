import {
  useColorScheme,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Colors from "../constants/Colors";
export const Expense = (expense: any) => {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    expense: {
      display: "flex",
      flexDirection: "row",
      padding: 30,
      width: "100%",
      borderBottomColor:
        Colors[colorScheme ?? "light"].text,
      borderBottomWidth: 1,
    },
    column: {
      display: "flex",
      justifyContent: "center",
      width: "33.33%",
      color: Colors[colorScheme ?? "light"].text,
    },
  });

  return (
    <View style={styles.expense}>
      <Text style={styles.column}>{expense.name}</Text>
      <Text style={styles.column}>${expense.amount}</Text>
      <Text style={styles.column}>{expense.paid_by}</Text>
    </View>
  );
};
