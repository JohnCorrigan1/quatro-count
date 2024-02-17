import { View, Text } from "react-native";
import { basestyles, formStyles } from "@lib/staticStyles";
import type { Group } from "@lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";

export default function BalancesPage() {
  const { name, gid } = useLocalSearchParams();

  const groupData: Group | undefined =
    useQueryClient().getQueryData(["groupData"]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={basestyles.container}>
        <Text style={basestyles.title}>Balances</Text>
        <Text style={basestyles.title}>{gid}</Text>
        <Text style={basestyles.title}>{name}</Text>
        {groupData && <Balances {...groupData} />}
      </View>
    </>
  );
}

const Balances = (groupData: Group) => {
  console.log("groupDatabalances", groupData);
  return (
    <View>
      <Text style={basestyles.title}>Balance</Text>
      {groupData.members.map((member) => (
        <Text
          style={formStyles.label}
          key={member.groupMemberId}>
          {member.username} {member.currentBalance}
        </Text>
      ))}
    </View>
  );
};
