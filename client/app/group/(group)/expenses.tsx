import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter, Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import {
  StyleSheet,
  useColorScheme,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Colors from "../../../constants/Colors";
import { Stack, useLocalSearchParams } from "expo-router";
import { Expense } from "../../../components/Expense";
import { AddExpenseButton } from "../../../components/AddExpenseButton";
import { Loading } from "../../../components/Loading";
import type { Group } from "../../lib/types";
import { basestyles } from "../../lib/staticStyles";
import { useEffect } from "react";

export default function GroupPage() {
  const { name, gid } = useLocalSearchParams();
  const queryClient = useQueryClient();

  const router = useRouter();

  const getGroupData = async (): Promise<Group> => {
    return await fetch(
      `http://127.0.0.1:5000/api/groups/${gid}`
    ).then((res) => res.json());
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ["groupData"],
    queryFn: getGroupData,
  });

  useEffect(() => {
    if (data) {
      queryClient.setQueryData(
        ["groupExpenses"],
        data.expenses
      );
    }
  }, [data]);

  const colorScheme = useColorScheme();

  return (
    <>
      {/* <Stack.Screen
        options={{
          headerBackTitle: "Groups",
          headerBackButtonMenuEnabled: false,
          headerBackVisible: false,
          title: data?.name,
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              {({ pressed }) => (
                <FontAwesome
                  name="arrow-left"
                  size={20}
                  color={Colors[colorScheme ?? "light"].text}
                  style={{
                    marginLeft: 10,
                    opacity: pressed ? 0.5 : 1,
                  }}
                />
              )}
            </Pressable>
          ),
        }}
      />*/}
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView>
        {isLoading ? (
          <Loading />
        ) : data?.expenses.length == 0 ? (
          <View style={basestyles.container}>
            <Text style={basestyles.title}>
              No expenses yet...
            </Text>
          </View>
        ) : (
          data?.expenses?.map((expense) => (
            <Expense {...expense} key={expense.id} />
          ))
        )}
      </ScrollView>
      <AddExpenseButton />
    </>
  );
}
