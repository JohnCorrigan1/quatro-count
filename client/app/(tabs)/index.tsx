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
import { Redirect, useRouter } from "expo-router";
import { SignedIn, useUser } from "@clerk/clerk-expo";

export default function TabOneScreen() {
  const { isLoaded, isSignedIn, user } = useUser();
  const queryClient = useQueryClient();
  const [groups, setGroups] = useState<any>([]);
  const router = useRouter();

  const getCurrentUser = async (): Promise<
    CurrentUser | undefined
  > => {
    const response = await fetch(
      `http://127.0.0.1:5000/api/users/${user?.id}`
    );
    if (response.ok) {
      return response.json();
    } else {
      router.push("/createaccount");
      // throw new Error("Something went wrong");
    }
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    enabled: !!user,
    retry: false,
  });

  useEffect(() => {
    if (isLoading) return;
    setGroups(data?.groups);
    console.log("user", user?.id);
  }, [data, user]);

  if (!isSignedIn && isLoaded) {
    return <Redirect href="/login" />;
  }

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
