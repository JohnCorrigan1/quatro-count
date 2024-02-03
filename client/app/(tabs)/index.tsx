import type { CurrentUser } from "../lib/types";
import { StyleSheet } from "react-native";
import { GroupContainer } from "../../components/GroupContainer";
import { View } from "../../components/Themed";
import { useEffect, useState } from "react";
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AddGroupButton } from "../../components/AddGroupButton";

export default function TabOneScreen() {
  const queryClient = useQueryClient();
  const [groups, setGroups] = useState<any>([]);

  const getCurrentUser = async (): Promise<CurrentUser> => {
    return await fetch(
      "http://127.0.0.1:5000/api/users/18"
    ).then((res) => res.json());
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const createUser = async () => {
    const username = "John Doe";
    const response = await fetch(
      "http://127.0.0.1:5000/api/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      }
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    if (isLoading) return;
    setGroups(data?.groups);
  }, [data]);

  return (
    <View style={styles.container}>
      <GroupContainer groups={groups} />
      <AddGroupButton />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  icon: {
    color: "white",
    backgroundColor: "blue",
  },
});
