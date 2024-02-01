import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  View,
  StyleSheet,
  useColorScheme,
} from "react-native";
import Colors from "../constants/Colors";
import { Stack, useLocalSearchParams } from "expo-router";
import { Expense } from "../components/Expense";
import { AddExpenseButton } from "../components/AddExpenseButton";
import { Loading } from "../components/Loading";

export default function GroupPage() {
  const queryClient = useQueryClient();
  const { _group, gid } = useLocalSearchParams();

  const getGroupData = async () => {
    return await fetch(
      `http://127.0.0.1:5000/api/groups/${gid}`
    ).then((res) => res.json());
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ["groupData"],
    queryFn: getGroupData,
  });

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

  return (
    <>
      <Stack.Screen options={{ title: data?.name }} />
      <View style={styles.page}>
        {isLoading ? (
          <Loading />
        ) : (
          data?.expenses.map((expense: any) => (
            <Expense {...expense} key={expense.id} />
          ))
        )}
        <AddExpenseButton />
      </View>
    </>
  );
}
