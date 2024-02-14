import { basestyles } from "../../lib/staticStyles";
import { View, Text } from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { Group } from "../../lib/types";
import {
  Stack,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { useEffect } from "react";

export default function Expense() {
  const { id } = useLocalSearchParams();
  const queryClient = useQueryClient();
  const parentLayout = useNavigation("/group");
  const [expenseData, setExpenseData] = useState({});

  // const expense: any = queryClient.getQueryData([
  //   "groupExpenses",
  // ]);

  const groupData: Group | undefined =
    queryClient.getQueryData(["groupData"]);

  useEffect(() => {
    if (!groupData) return;

    const expense = groupData.expenses.find(
      (expense: any) => expense.id === id
    );
    console.log("expense", expense);

    const paidFor = groupData?.members.filter((member) =>
      expense?.paid_for.includes(member.groupMemberId)
    );

    const paidBy = groupData?.members.find(
      (member) => member.groupMemberId === expense?.paid_by
    );

    const newExpense = {};

    setExpenseData({
      ...expense,
      paidFor,
      paidBy,
    });
    console.log("expense", expense);
    console.log("expenserr", expenseData);
    console.log(paidFor);

    console.log("groupData", groupData);
  }, [groupData]);

  return (
    <>
      {/* <Stack.Screen /> */}
      <View style={basestyles.container}>
        <Text style={basestyles.title}>Expense</Text>
        <Text style={basestyles.title}>{id}</Text>
      </View>
    </>
  );
}
