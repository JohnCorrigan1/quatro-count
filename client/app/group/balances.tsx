import { View, Text } from "react-native";
import { basestyles } from "../lib/staticStyles";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

export default function BalancesPage() {
  const { name, gid } = useLocalSearchParams();
  console.log("gid", gid, "name", name);

  //   const groupParams = useQuery({
  //     queryKey: ["groupParams"],
  //     queryFn: () => {
  //       return { name, gid };
  //     },
  //   });

  return (
    <View style={basestyles.container}>
      <Text style={basestyles.title}>Balances</Text>
      <Text style={basestyles.title}>{gid}</Text>
      <Text style={basestyles.title}>{name}</Text>
    </View>
  );
}
