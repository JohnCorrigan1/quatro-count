import { useQueryClient } from "@tanstack/react-query";
import { Stack, router, useRouter } from "expo-router";
import { Platform, Pressable, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export default function GroupLayout() {
  const groupData: any = useQueryClient().getQueryData([
    "groupData",
  ]);
  const [options, setOptions] = useState<any>({
    title: groupData?.name ?? "Group",
  });

  const ios = Platform.OS === "ios";

  useEffect(() => {
    if (ios) {
      setOptions({
        headerLeft: () => <Back />,
        title: groupData?.name ?? "Group",
      });
    }
  }, [Platform.OS]);

  return (
    <Stack>
      <Stack.Screen name="(group)" options={options} />
      <Stack.Screen
        name="addexpense"
        options={{
          presentation: "modal",
          title: "Add Expense",
        }}
      />
    </Stack>
  );
}

const Back = () => {
  const isIos = Platform.OS === "ios";
  if (isIos) {
    return (
      <Pressable>
        <FontAwesome
          name="chevron-left"
          size={20}
          color="white"
          onPress={() => {
            router.back();
          }}
        />
      </Pressable>
    );
  }
};
