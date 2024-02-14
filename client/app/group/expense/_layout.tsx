import { Stack, useNavigation } from "expo-router";

export default function ExpenseLayout() {
  const parentLayout = useNavigation("/group");
  return (
    <Stack>
      <Stack.Screen
        name="expense"
        options={{
          title: "Expense",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
