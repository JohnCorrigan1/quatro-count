import { useQueryClient } from "@tanstack/react-query";
import { Stack } from "expo-router";

export default function GroupLayout() {
  const groupData: any = useQueryClient().getQueryData([
    "groupData",
  ]);

  return (
    <Stack>
      <Stack.Screen
        name="(group)"
        options={{
          headerBackTitleVisible: true,
          headerBackTitle: "Groups",
          //   headerBackTitleVisible: true,
          title: groupData?.name ?? "Group",
          //   headerBackTitle: "Groups",
        }}
      />
      {/* <Stack.Screen
        name="expense"
        options={{ headerShown: false }}
      /> */}
    </Stack>
  );
}
