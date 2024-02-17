import {
  useColorScheme,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Colors from "../constants/Colors";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";

export const Expense = (expense: any) => {
  const { gid, name } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const queryClient = useQueryClient();

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
  const router = useRouter();
  const navigateToExpense = () => {
    router.push({
      pathname: "/group/expense",
      params: {
        eid: expense.id,
        name,
        gid,
      },
    });
  };

  return (
    <Pressable onPress={navigateToExpense}>
      <View style={styles.expense}>
        <Text style={styles.column}>{expense.title}</Text>
        <Text style={styles.column}>${expense.amount}</Text>
        <Text style={styles.column}>
          {new Date(
            expense.created_at
          ).toLocaleDateString()}
        </Text>
      </View>
    </Pressable>
  );
};
