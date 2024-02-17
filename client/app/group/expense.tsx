import { basestyles } from "@lib/staticStyles";
import { View, Text } from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { Group } from "@lib/types";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

export default function Expense() {
  const { eid } = useLocalSearchParams();
  const queryClient = useQueryClient();
  const [expenseData, setExpenseData] = useState({});

  const groupData: Group | undefined =
    queryClient.getQueryData(["groupData"]);

  useEffect(() => {
    if (!groupData) return;

    const expense = groupData.expenses.find(
      (expense: any) => expense.id === eid
    );

    const paidFor = groupData?.members.filter((member) =>
      expense?.paid_for.includes(member.groupMemberId)
    );

    const paidBy = groupData?.members.find(
      (member) => member.groupMemberId === expense?.paid_by
    );

    setExpenseData({
      ...expense,
      paidFor,
      paidBy,
    });
  }, [groupData]);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Expense",
          headerBackTitle: "Expenses",
        }}
      />
      <View style={basestyles.container}>
        <Text style={basestyles.title}>Expense</Text>
        <Text style={basestyles.title}>{eid}</Text>
      </View>
    </>
  );
}
