import { View, Text } from "react-native";
import { basestyles } from "../../lib/staticStyles";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";

export default function BalancesPage() {
  const { name, gid } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={basestyles.container}>
        <Text style={basestyles.title}>Balances</Text>
        <Text style={basestyles.title}>{gid}</Text>
        <Text style={basestyles.title}>{name}</Text>
      </View>
    </>
  );
}
