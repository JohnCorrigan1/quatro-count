import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Pressable,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { Link, Stack, useLocalSearchParams } from "expo-router";
type Expense = {
  title: string;
  for: string[];
  paidBy: string;
  amount: number;
  date?: Date;
};

const exampleExpenses: Expense[] = [
  {
    title: "Rent",
    for: ["Andrew", "Nathan"],
    paidBy: "Andrew",
    amount: 2000,
    date: new Date(),
  },
  {
    title: "Groceries",
    for: ["Andrew", "Nathan"],
    paidBy: "Nathan",
    amount: 100,
    date: new Date(),
  },
  {
    title: "Internet",
    for: ["Andrew", "Nathan"],
    paidBy: "Andrew",
    amount: 100,
    date: new Date(),
  },
];

export default function GroupPage() {
  const { group } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    page: {
      display: "flex",
      height: "100%",
      width: "100%",
      alignItems: "center",
    },
    header: {
      fontSize: 20,
      fontWeight: "500",
      color: Colors[colorScheme ?? "light"].text,
      width: "100%",
    },
  });
  const groupStyles = StyleSheet.create({
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

  const [expenses, setExpenses] = useState<Expense[]>(exampleExpenses);

  return (
    <>
      <Stack.Screen options={{ title: group.toString() }} />
      <View style={styles.page}>
        {expenses.map((expense, index) => (
          <Expense {...expense} key={index} />
        ))}
        <Link style={groupStyles.addGroup} href="/addexpense" asChild>
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
      </View>
    </>
  );
}

function Expense(expense: Expense) {
  const styles = StyleSheet.create({
    expense: {
      display: "flex",
      flexDirection: "row",
      padding: 30,
      width: "100%",
      borderBottomColor: "black",
      borderBottomWidth: 1,
    },
    column: {
      display: "flex",
      justifyContent: "center",
      width: "33.33%",
    },
  });

  return (
    <View style={styles.expense}>
      <Text style={styles.column}>{expense.title}</Text>
      <Text style={styles.column}>${expense.amount}</Text>
      <Text style={styles.column}>{expense.paidBy}</Text>
    </View>
  );
}
