import { useQuery } from "@tanstack/react-query";
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
import Colors from "../../constants/Colors";
import { Stack, useLocalSearchParams } from "expo-router";
import { Expense } from "../../components/Expense";
import { AddExpenseButton } from "../../components/AddExpenseButton";
import { Loading } from "../../components/Loading";
import type { Group } from "../lib/types";
import { basestyles } from "../lib/staticStyles";

export default function GroupPage() {
  const { name, gid } = useLocalSearchParams();
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
      <Stack.Screen
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
                  color={
                    Colors[colorScheme ?? "light"].text
                  }
                  style={{
                    marginLeft: 10,
                    opacity: pressed ? 0.5 : 1,
                  }}
                />
              )}
            </Pressable>
          ),
          headerRight: () => (
            <Link
              push
              href={{
                pathname: "/groups/settings",
                params: { gid, name },
              }}
              asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="cog"
                    size={25}
                    color={
                      Colors[colorScheme ?? "light"].text
                    }
                    style={{
                      marginRight: 15,
                      opacity: pressed ? 0.5 : 1,
                    }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
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
